import React, { useState, useRef } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import translate from '~/languages';

import { showErrorSnackbar } from '~/services/Snackbar';
import Modal from '~/components/Modal';

import { ModalContainer, Input, SubmitButton } from './styles';
import { resetPasswordRequest } from '~/store/modules/auth/actions';

const resetSchema = Yup.object().shape({
    newPasswordConfirm: Yup.string().required(translate('require_password')),
    newPassword: Yup.string().required(translate('require_password')),
    password: Yup.string().required(translate('require_password')),
    email: Yup.string()
        .email(translate('valid_email'))
        .required(translate('require_email')),
});

export default function ResetEmailModal({ showModal, onDismiss }) {
    const loadingReset = useSelector(state => state.ui.loadingReset);
    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newPasswordConfirm, setNewPasswordConfirm] = useState();

    const passwordRef = useRef();
    const newPasswordRef = useRef();
    const newPasswordConfirmRef = useRef();

    const onEmailSubmit = () => passwordRef.current.focus();
    const onPasswordSubmit = () => newPasswordRef.current.focus();
    const onNewPasswordSubmit = () => newPasswordConfirmRef.current.focus();

    const onNewPasswordConfirmSubmit = () => {
        Keyboard.dismiss();
        resetSchema
            .validate({ email, password, newPassword, newPasswordConfirm })
            .then(() => {
                if (newPassword !== newPasswordConfirm) {
                    showErrorSnackbar(translate('reset_diff_password_error'));
                    return;
                }
                dispatch(resetPasswordRequest(email, password, newPassword));
            })
            .catch(({ message }) => showErrorSnackbar(message));
    };

    const handleDismiss = () => {
        if (!loadingReset) {
            onDismiss();
        }
    };

    return (
        <Modal isVisible={showModal} onDismiss={handleDismiss} maxHeight="40%">
            <ModalContainer>
                <Input
                    icon="envelope"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    editable={!loadingReset}
                    selectTextOnFocus={!loadingReset}
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
                    editable={!loadingReset}
                    selectTextOnFocus={!loadingReset}
                    onSubmitEditing={onPasswordSubmit}
                    secureTextEntry
                    placeholder={translate('old_password')}
                />
                <Input
                    ref={newPasswordRef}
                    icon="lock"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    editable={!loadingReset}
                    selectTextOnFocus={!loadingReset}
                    onSubmitEditing={onNewPasswordSubmit}
                    placeholder={translate('new_password')}
                    secureTextEntry
                />
                <Input
                    ref={newPasswordConfirmRef}
                    icon="lock"
                    value={newPasswordConfirm}
                    onChangeText={setNewPasswordConfirm}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="send"
                    blurOnSubmit={false}
                    editable={!loadingReset}
                    selectTextOnFocus={!loadingReset}
                    onSubmitEditing={onNewPasswordConfirmSubmit}
                    placeholder={translate('register_confirm_password')}
                    secureTextEntry
                />
                <SubmitButton
                    onPress={onNewPasswordConfirmSubmit}
                    loading={loadingReset}
                >
                    {translate('create_project_confirm_phase')}
                </SubmitButton>
            </ModalContainer>
        </Modal>
    );
}

ResetEmailModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
};
