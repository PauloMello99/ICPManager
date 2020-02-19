import React, { useCallback, useState, useRef } from 'react';
import { Keyboard } from 'react-native';
import { useFocusEffect } from 'react-navigation-hooks';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import translate from '~/languages';

import AppBar from '~/components/Appbar';
import ProfilePicture from '~/components/ProfilePicture';
import LoadingPicture from './LoadingPicture';

import { changeStatusBarColor } from '~/store/modules/ui/actions';
import { showErrorSnackbar } from '~/services/Snackbar';
import UniversityDAO from '~/dao/UniversityDAO';

import {
    Container,
    ScrollContainer,
    InnerContainer,
    IconContainer,
    PhotoIcon,
    Input,
    SubmitButton,
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
            const dao = new UniversityDAO();
            const id = await dao.generateKey();
            const university = {
                name,
                acronym,
                country,
                state: unState,
                enable: type === 'coordinator',
                id,
            };
            await dao.save(id, university);
            setSaving(false);
        } catch (err) {
            showErrorSnackbar(translate('create_university_failure'));
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
                        <LoadingPicture />
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
                        autoCorrect={false}
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
                        autoCorrect={false}
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
                        autoCorrect={false}
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
                        autoCorrect={false}
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
