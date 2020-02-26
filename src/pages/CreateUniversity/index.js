import React, { useCallback, useState, useRef } from 'react';
import { Keyboard } from 'react-native';
import { useFocusEffect } from 'react-navigation-hooks';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import translate from '~/languages';

import { coordinators, setUniversityPhoto } from '~/services/firebase';

import AppBar from '~/components/Appbar';
import ProfilePicture from '~/components/ProfilePicture';

import { changeStatusBarColor } from '~/store/modules/ui/actions';
import { showErrorSnackbar, showSuccessSnackbar } from '~/services/Snackbar';

import UniversityDAO from '~/dao/UniversityDAO';
import UserDAO from '~/dao/UserDAO';

import {
    Container,
    ScrollContainer,
    InnerContainer,
    IconContainer,
    PhotoIcon,
    Input,
    SubmitButton,
    Loading,
} from './styles';

const universitySchema = Yup.object().shape({
    unState: Yup.string().required('Campo Estado é obrigatório.'),
    country: Yup.string().required('Campo País é obrigatório.'),
    acronym: Yup.string().required('Campo Acrônimo é obrigatório.'),
    name: Yup.string().required(translate('require_name')),
});

export default function CreateUniversity({ navigation }) {
    const type = useSelector(state => state.auth.type);
    const dispatch = useDispatch();

    const [name, setName] = useState();
    const [acronym, setAcronym] = useState();
    const [country, setCountry] = useState();
    const [unState, setUnState] = useState();
    const [picture, setPicture] = useState();
    const [saving, setSaving] = useState(false);
    const [loadingPicture, setLoadingPicture] = useState(false);

    const pictureBase64 = useRef(null);

    const acronymRef = useRef();
    const countryRef = useRef();
    const stateRef = useRef();

    const onNameSubmit = () => acronymRef.current.focus();
    const onAcronymSubmit = () => countryRef.current.focus();
    const onCountrySubmit = () => stateRef.current.focus();

    const createInstituition = async () => {
        try {
            setSaving(true);

            const userDAO = new UserDAO();
            const universityDAO = new UniversityDAO();
            const id = await universityDAO.generateKey();

            let url = null;
            if (pictureBase64.current) {
                await setUniversityPhoto(id, pictureBase64.current)
                    .then(downloadUrl => {
                        url = downloadUrl;
                    })
                    .catch(() =>
                        showErrorSnackbar(
                            translate('edit_profile_picture_failure'),
                            1000
                        )
                    );
            }

            const university = {
                name,
                acronym,
                country,
                state: unState,
                enable: type === 'coordinator',
                id,
                picture: url,
            };

            if (type === 'professor') {
                const coordNotification = {
                    text: name,
                    key: 'UNIVERSITY_ENABLE',
                    universityId: id,
                };
                const res = await coordinators();
                const allCoordinators = Object.values(res.val());

                const coordResults = allCoordinators.map(async coord => {
                    const notificationId = await userDAO.generateNotificationKey(
                        coord.id
                    );
                    return userDAO.addNotification(coord.id, {
                        ...coordNotification,
                        id: notificationId,
                    });
                });
                Promise.all(coordResults);
            }

            await universityDAO.save(id, university);
            setSaving(false);
            navigation.goBack();
            showSuccessSnackbar(translate('create_university_success'));
        } catch (err) {
            showErrorSnackbar(translate('create_university_failure'));
            setSaving(false);
        }
    };

    const onStateSubmit = () => {
        Keyboard.dismiss();
        universitySchema
            .validate({ name, acronym, country, unState })
            .then(createInstituition)
            .catch(({ message }) => showErrorSnackbar(message));
    };

    const handleEditPicture = () => {
        if (saving) {
            return;
        }
        ImagePicker.openPicker({
            cropping: true,
            includeBase64: true,
            width: 500,
            height: 300,
            cropperCircleOverlay: true,
        }).then(image => {
            const { data, mime } = image;
            pictureBase64.current = data;
            setLoadingPicture(true);
            setPicture(`data:${mime};base64,${data}`);
            setTimeout(() => setLoadingPicture(false), 1000);
        });
    };

    const onBackPress = () => navigation.goBack();

    useFocusEffect(
        useCallback(() => {
            dispatch(changeStatusBarColor('#f1f1f1', 'dark-content'));
        }, [dispatch])
    );

    return (
        <Container>
            <AppBar
                title={translate('new_instituition')}
                onBackPress={onBackPress}
            />
            <ScrollContainer>
                <InnerContainer>
                    {loadingPicture ? (
                        <Loading />
                    ) : (
                        <ProfilePicture source={picture} />
                    )}
                    <IconContainer onPress={handleEditPicture}>
                        <PhotoIcon />
                    </IconContainer>
                    <Input
                        icon="user"
                        value={name}
                        onChangeText={setName}
                        keyboardType="email-address"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        editable={!saving}
                        selectTextOnFocus={!saving}
                        onSubmitEditing={onNameSubmit}
                        placeholder={translate('register_name')}
                    />
                    <Input
                        ref={acronymRef}
                        icon="user"
                        value={acronym}
                        onChangeText={setAcronym}
                        keyboardType="email-address"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        editable={!saving}
                        selectTextOnFocus={!saving}
                        onSubmitEditing={onAcronymSubmit}
                        placeholder={translate('acronym')}
                    />
                    <Input
                        ref={countryRef}
                        icon="user"
                        value={country}
                        onChangeText={setCountry}
                        keyboardType="email-address"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        editable={!saving}
                        selectTextOnFocus={!saving}
                        onSubmitEditing={onCountrySubmit}
                        placeholder={translate('country')}
                    />
                    <Input
                        ref={stateRef}
                        icon="user"
                        value={unState}
                        onChangeText={setUnState}
                        keyboardType="email-address"
                        returnKeyType="send"
                        blurOnSubmit={false}
                        editable={!saving}
                        selectTextOnFocus={!saving}
                        onSubmitEditing={onStateSubmit}
                        placeholder={translate('state')}
                    />
                    <SubmitButton onPress={onStateSubmit} loading={saving}>
                        {translate('create_project_confirm_phase')}
                    </SubmitButton>
                </InnerContainer>
            </ScrollContainer>
        </Container>
    );
}

CreateUniversity.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
    }).isRequired,
};
