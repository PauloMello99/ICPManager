import React, { useState, useRef } from 'react';
import { Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import translate from '~/languages';

import AppBar from '~/components/Appbar';
import Picker from '~/components/Picker';

import UserDAO from '~/dao/UserDAO';
import StudentDAO from '~/dao/StudentDAO';
import ProfessorDAO from '~/dao/ProfessorDAO';
import { currentUser, register } from '~/services/firebase';
import { showErrorSnackbar } from '~/services/Snackbar';

import { Container, Input, InnerContainer, SubmitButton } from './styles';

const registerSchema = Yup.object().shape({
    type: Yup.string().required(translate('require_user_type')),
    passwordConfirm: Yup.string()
        .length(6, translate('require_password_length'))
        .required(translate('require_password_confim')),
    password: Yup.string()
        .length(6, translate('require_password_length'))
        .required(translate('require_password')),
    email: Yup.string()
        .email(translate('valid_email'))
        .required(translate('require_email')),
    name: Yup.string().required(translate('require_name')),
});

export default function Register({ navigation }) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [type, setType] = useState();

    const [loading, setLoading] = useState(false);

    const onNameSubmit = () => emailRef.current.focus();
    const onEmailSubmit = () => passwordRef.current.focus();
    const onPasswordSubmit = () => passwordConfirmRef.current.focus();
    const onPickerChange = selected => setType(selected);
    const onBackPress = () => navigation.goBack();

    const userDAO = new UserDAO();
    const studentDAO = new StudentDAO();
    const professorDAO = new ProfessorDAO();

    const createUser = async id => {
        await userDAO.save(id, {
            id,
            type,
        });
        const userInfo = {
            id,
            name,
            email,
            enable: true,
        };
        if (type === 'student') {
            await studentDAO.save(id, userInfo);
        } else if (type === 'professor') {
            await professorDAO.save(id, userInfo);
        }
    };

    const createAccount = async () =>
        register(email, password)
            .then(async () => {
                const { uid } = await currentUser();
                await createUser(uid);
                navigation.goBack();
            })
            .catch(() => showErrorSnackbar(translate('register_failure')));

    const onSubmit = async () => {
        setHideConfirmPassword(true);
        setHidePassword(true);
        await registerSchema
            .validate({ name, email, password, passwordConfirm, type })
            .then(async () => {
                setLoading(true);
                if (password !== passwordConfirm) {
                    showErrorSnackbar(translate('register_password_match'));
                } else {
                    await createAccount();
                }
                setLoading(false);
            })
            .catch(({ message }) => showErrorSnackbar(message));
    };

    const userTypes = [
        { value: 'student', label: translate('student') },
        { value: 'professor', label: translate('professor') },
    ];

    const handleHidePassword = () => setHidePassword(!hidePassword);
    const handleHideConfirmPassword = () =>
        setHideConfirmPassword(!hideConfirmPassword);

    return (
        <Container>
            <AppBar
                onBackPress={onBackPress}
                title={translate('register_account')}
            />
            <InnerContainer>
                <Input
                    icon="user"
                    value={name}
                    onChangeText={setName}
                    keyboardType="email-address"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    editable={!loading}
                    selectTextOnFocus={!loading}
                    onSubmitEditing={onNameSubmit}
                    placeholder={translate('register_name')}
                />
                <Input
                    ref={emailRef}
                    icon="envelope"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    editable={!loading}
                    selectTextOnFocus={!loading}
                    onSubmitEditing={onEmailSubmit}
                    placeholder={translate('email')}
                />
                <Input
                    ref={passwordRef}
                    icon="lock"
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    editable={!loading}
                    selectTextOnFocus={!loading}
                    onSubmitEditing={onPasswordSubmit}
                    placeholder={translate('password')}
                    secureTextEntry={hidePassword}
                    onButtonPress={handleHidePassword}
                    buttonTitle={
                        hidePassword ? translate('show') : translate('hide')
                    }
                />
                <Input
                    ref={passwordConfirmRef}
                    icon="lock"
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="send"
                    blurOnSubmit={false}
                    editable={!loading}
                    selectTextOnFocus={!loading}
                    onSubmitEditing={Keyboard.dismiss}
                    secureTextEntry={hideConfirmPassword}
                    onButtonPress={handleHideConfirmPassword}
                    buttonTitle={
                        hideConfirmPassword
                            ? translate('show')
                            : translate('hide')
                    }
                    placeholder={translate('register_confirm_password')}
                />
                <Picker
                    enabled={!loading}
                    items={userTypes}
                    onValueChange={onPickerChange}
                    value={type}
                    icon="user"
                    placeholder={translate('register_user_placeholder')}
                />
                <SubmitButton onPress={onSubmit} loading={loading}>
                    {translate('register')}
                </SubmitButton>
            </InnerContainer>
        </Container>
    );
}

Register.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        getParam: PropTypes.func.isRequired,
    }).isRequired,
};
