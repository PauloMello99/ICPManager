import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import DatePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import { Keyboard } from 'react-native';
import { useFocusEffect } from 'react-navigation-hooks';
import { useSelector, useDispatch } from 'react-redux';
import { format, subDays } from 'date-fns';
import * as Yup from 'yup';
import translate from '~/languages';

import {
    userProfile,
    universities as getUniversities,
    setProfilePhoto,
} from '~/services/firebase';

import AppBar from '~/components/Appbar';
import Picker from '~/components/Picker';
import SavingModal from '~/components/SavingModal';
import InputPicker from '~/components/InputPicker';
import ProfilePicture from '~/components/ProfilePicture';
import UniversityList from '~/components/UniversityList';
import UniversityModal from '~/components/UniversityModal';

import { changeStatusBarColor } from '~/store/modules/ui/actions';

import { showErrorSnackbar } from '~/services/Snackbar';
import CoordinatorDAO from '~/dao/CoordinatorDAO';
import ProfessorDAO from '~/dao/ProfessorDAO';
import StudentDAO from '~/dao/StudentDAO';

import {
    Container,
    InnerContainer,
    Input,
    SubmitButton,
    Loading,
    Label,
    RowContainer,
    EditIcon,
    IconContainer,
    ListContainer,
    PhotoIcon,
    ScrollContainer,
} from './styles';
import LoadingPicture from './LoadingPicture';

const profileSchema = Yup.object().shape({
    birthDate: Yup.date().max(subDays(new Date(), 1), translate('valid_date')),
    facebook: Yup.string(),
    gender: Yup.string(),
    skype: Yup.string(),
    email: Yup.string(),
    name: Yup.string().required(translate('require_name')),
});

const genders = [
    { value: 'male', label: translate('gender_male') },
    { value: 'female', label: translate('gender_female') },
    { value: 'other', label: translate('gender_other') },
];

export default function EditProfile({ navigation }) {
    const dispatch = useDispatch();
    const { uid, type } = useSelector(state => state.auth);
    const isStudent = type === 'student';

    const [name, setName] = useState();
    const [skype, setSkype] = useState();
    const [gender, setGender] = useState();
    const [picture, setPicture] = useState();
    const [facebook, setFacebook] = useState();
    const [universities, setUniversities] = useState([]);
    const [birthDate, setBirthDate] = useState(new Date());

    const [universitiesId, setUniversitiesId] = useState([]);

    const [degree, setDegree] = useState();
    const [bio, setBio] = useState();

    const pictureBase64 = useRef(null);
    const [loadingPicture, setLoadingPicture] = useState(false);

    const [showPicker, setShowPicker] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const formattedDate = useRef(format(birthDate, translate('date_format')));
    const facebookRef = useRef();
    const bioRef = useRef();
    const skypeRef = useRef();

    const onFacebookSubmit = () => skypeRef.current.focus();
    const onNameSubmit = () => facebookRef.current.focus();
    const onDegreeSubmit = () => bioRef.current.focus();
    const onPickerChange = val => setGender(val);

    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);
    const onBackPress = () => navigation.goBack();

    const openDatePicker = () => setShowPicker(true);
    const onDateChange = (_, date) => {
        setShowPicker(false);
        formattedDate.current = format(date, translate('date_format'));
        setBirthDate(date);
    };

    const onConfirmSelection = universityList => {
        const ids = universityList.map(un => un.id);
        setUniversitiesId(ids);
        setUniversities(universityList);
        closeModal();
    };

    const saveProfile = async () => {
        try {
            setSaving(true);

            let url = null;
            if (pictureBase64.current) {
                await setProfilePhoto(uid, pictureBase64.current)
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

            // lista de id de universidades
            const universityList = universities.map(un => un.id);

            let dao;
            const profileObj = {
                id: uid,
                name,
                skype,
                gender,
                picture: url || picture,
                facebook,
                universityList,
                birthDate: birthDate.toString(),
            };

            switch (type) {
                case 'student': {
                    dao = new StudentDAO();
                    await dao.update(uid, profileObj);
                    break;
                }
                case 'professor': {
                    profileObj.degree = degree;
                    profileObj.bio = bio;
                    dao = new ProfessorDAO();
                    await dao.update(uid, profileObj);
                    break;
                }
                case 'coordinator': {
                    profileObj.degree = degree;
                    profileObj.bio = bio;
                    dao = new CoordinatorDAO();
                    await dao.update(uid, profileObj);
                    // Duplicata do coordenador para listagem nos projetos e etc
                    dao = new ProfessorDAO();
                    await dao.update(uid, profileObj);
                    break;
                }
                default:
            }
            setSaving(false);
            navigation.goBack();
        } catch (err) {
            setSaving(false);
            showErrorSnackbar(translate('edit_profile_save_failure'));
        }
    };

    const handleSubmit = async () => {
        await profileSchema
            .validate({
                birthDate,
                facebook,
                gender,
                skype,
                name,
                picture,
            })
            .then(saveProfile)
            .catch(({ message }) => showErrorSnackbar(message));
    };

    const handleEditPicture = () =>
        ImagePicker.openPicker({
            cropping: true,
            includeBase64: true,
            width: 300,
            height: 300,
            cropperCircleOverlay: true,
        }).then(image => {
            const { data, mime } = image;
            pictureBase64.current = data;
            setLoadingPicture(true);
            setPicture(`data:${mime};base64,${data}`);
            setTimeout(() => setLoadingPicture(false), 1000);
        });

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const response = await userProfile(type, uid);
            const profileObj = response.val() || {};
            setName(profileObj.name);
            setGender(profileObj.gender);
            setSkype(profileObj.skype);
            setFacebook(profileObj.facebook);
            setPicture(profileObj.picture);

            setUniversitiesId(profileObj.universityList || []);

            let date = new Date();
            if (profileObj.birthDate) {
                date = new Date(profileObj.birthDate);
            }
            setBirthDate(date);
            formattedDate.current = format(date, translate('date_format'));
            if (!isStudent) {
                setDegree(profileObj.degree);
                setBio(profileObj.bio);
            }

            if (profileObj.universityList) {
                const universityResponse = await getUniversities();
                const list = Object.values(universityResponse.val() || []);
                const myList = list.filter(
                    uni =>
                        profileObj.universityList &&
                        profileObj.universityList.includes(uni.id)
                );
                setUniversities(myList);
            }
            setLoading(false);
        };
        getData();
        return () => ImagePicker.clean();
    }, [isStudent, type, uid]);

    useFocusEffect(
        useCallback(() => {
            dispatch(changeStatusBarColor('#f1f1f1', 'dark-content'));
        }, [dispatch])
    );

    return (
        <Container>
            <AppBar
                title={translate('edit_profile_title')}
                onBackPress={onBackPress}
            />
            {!loading ? (
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
                            ref={facebookRef}
                            icon="facebook-f"
                            value={facebook}
                            onChangeText={setFacebook}
                            keyboardType="email-address"
                            autoCorrect={false}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            editable={!saving}
                            selectTextOnFocus={!saving}
                            onSubmitEditing={onFacebookSubmit}
                            placeholder="Facebook"
                        />
                        <Input
                            ref={skypeRef}
                            icon="skype"
                            value={skype}
                            onChangeText={setSkype}
                            keyboardType="email-address"
                            autoCorrect={false}
                            returnKeyType="next"
                            blurOnSubmit={false}
                            editable={!saving}
                            selectTextOnFocus={!saving}
                            onSubmitEditing={Keyboard.dismiss}
                            placeholder="Skype"
                        />
                        <Picker
                            items={genders}
                            placeholder={translate('gender')}
                            value={gender}
                            onValueChange={onPickerChange}
                            enabled={!saving}
                            icon="user"
                        />
                        <InputPicker
                            icon="calendar"
                            leftIcon="birthday-cake"
                            value={formattedDate.current}
                            enabled={!saving}
                            placeholder={translate('birth_date')}
                            onPress={openDatePicker}
                        />
                        {!isStudent && (
                            <Input
                                icon="user"
                                value={degree}
                                onChangeText={setDegree}
                                keyboardType="email-address"
                                autoCorrect={false}
                                returnKeyType="none"
                                multiline
                                numberOfLines={3}
                                blurOnSubmit={false}
                                editable={!saving}
                                selectTextOnFocus={!saving}
                                onSubmitEditing={onDegreeSubmit}
                                placeholder={translate('edit_profile_degree')}
                            />
                        )}
                        {!isStudent && (
                            <Input
                                ref={bioRef}
                                icon="user"
                                value={bio}
                                onChangeText={setBio}
                                keyboardType="email-address"
                                autoCorrect={false}
                                returnKeyType="none"
                                multiline
                                numberOfLines={3}
                                blurOnSubmit={false}
                                editable={!saving}
                                selectTextOnFocus={!saving}
                                placeholder="Bio"
                            />
                        )}
                        <RowContainer>
                            <Label>{translate('universities')}</Label>
                            <IconContainer onPress={openModal}>
                                <EditIcon />
                            </IconContainer>
                        </RowContainer>

                        <ListContainer>
                            <UniversityList list={universities} />
                        </ListContainer>

                        <SubmitButton onPress={handleSubmit}>
                            {translate('edit_profile_save')}
                        </SubmitButton>
                        {showPicker && (
                            <DatePicker
                                value={birthDate}
                                onChange={onDateChange}
                                is24Hour
                                display="calendar"
                            />
                        )}
                        <UniversityModal
                            showModal={showModal}
                            onDismiss={closeModal}
                            selected={universitiesId}
                            onConfirmChange={onConfirmSelection}
                        />
                    </InnerContainer>
                </ScrollContainer>
            ) : (
                <Loading />
            )}
            <SavingModal isVisible={saving} />
        </Container>
    );
}

EditProfile.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        getParam: PropTypes.func.isRequired,
    }).isRequired,
};
