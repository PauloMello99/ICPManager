import React, { useState, useRef, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { useFocusEffect } from 'react-navigation-hooks';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import translate from '~/languages';

import {
    recoverPasswordRequest,
    signInRequest,
} from '~/store/modules/auth/actions';
import NavigationService from '~/navigation/NavigationService';
import { changeStatusBarColor } from '~/store/modules/ui/actions';
import { showErrorSnackbar } from '~/services/Snackbar';

import Modal from '~/components/Modal';

import {
    Container,
    InnerContainer,
    Form,
    Input,
    LinkButton,
    ResetPasswordText,
    SubmitButton,
    Logo,
    ModalInnerContainer,
    ModalTitleText,
} from './styles';

const loginSchema = Yup.object().shape({
    password: Yup.string().required(translate('require_password')),
    email: Yup.string()
        .email(translate('require_email'))
        .required(translate('require_email')),
});

const forgotMyPasswordSchema = Yup.object().shape({
    passwordRequestEmail: Yup.string()
        .email(translate('require_email'))
        .required(translate('require_email')),
});

export default function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [passwordRequestEmail, setPasswodRequestEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const passwordRef = useRef();
    const { loading, recoverPasswordLoading } = useSelector(
        state => state.auth
    );

    const onEmailSubmit = () => passwordRef.current.focus();
    const handleHidePassword = () => setHidePassword(!hidePassword);
    const openModal = () => {
        if (!loading) {
            setShowModal(true);
        }
    };
    const closeModal = () => setShowModal(false);
    const goToRegister = () => {
        if (!loading) {
            NavigationService.navigate('Register');
        }
    };

    const onSubmit = async () => {
        Keyboard.dismiss();
        setHidePassword(true);
        await loginSchema
            .validate({ email, password })
            .then(() => dispatch(signInRequest(email, password)))
            .catch(({ message }) => showErrorSnackbar(message));
    };

    const handlePasswordRequest = async () => {
        Keyboard.dismiss();
        await forgotMyPasswordSchema
            .validate({ passwordRequestEmail })
            .then(() => dispatch(recoverPasswordRequest(passwordRequestEmail)))
            .catch(({ message }) => showErrorSnackbar(message));
    };

    useFocusEffect(
        useCallback(() => {
            dispatch(changeStatusBarColor('#fff', 'dark-content'));
        }, [dispatch])
    );

    return (
        <Container>
            <InnerContainer>
                <Logo />
                <Form>
                    <Input
                        icon="user"
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
                        returnKeyType="send"
                        blurOnSubmit={false}
                        editable={!loading}
                        selectTextOnFocus={!loading}
                        onSubmitEditing={onSubmit}
                        secureTextEntry={hidePassword}
                        onButtonPress={handleHidePassword}
                        buttonTitle={
                            hidePassword ? translate('show') : translate('hide')
                        }
                        placeholder={translate('password')}
                    />
                    <SubmitButton onPress={onSubmit} loading={loading}>
                        Login
                    </SubmitButton>
                    <LinkButton onPress={goToRegister}>
                        <ResetPasswordText>
                            {translate('login_register')}
                        </ResetPasswordText>
                    </LinkButton>
                    <LinkButton onPress={openModal}>
                        <ResetPasswordText>
                            {translate('login_forgot_password')}
                        </ResetPasswordText>
                    </LinkButton>
                </Form>
                <Modal isVisible={showModal} onDismiss={closeModal}>
                    <ModalInnerContainer>
                        <ModalTitleText>
                            {translate('login_recover_password')}
                        </ModalTitleText>
                        <Input
                            icon="user"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            returnKeyType="send"
                            onSubmitEditing={handlePasswordRequest}
                            blurOnSubmit={false}
                            value={passwordRequestEmail}
                            onChangeText={setPasswodRequestEmail}
                            editable={!recoverPasswordLoading}
                            selectTextOnFocus={!recoverPasswordLoading}
                            placeholder={translate('email')}
                        />
                        <SubmitButton
                            loading={recoverPasswordLoading}
                            onPress={handlePasswordRequest}
                        >
                            {translate('login_send')}
                        </SubmitButton>
                    </ModalInnerContainer>
                </Modal>
            </InnerContainer>
        </Container>
    );
}
