import React, { useState, useRef } from 'react';
import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import translate from '~/languages';

import { showErrorSnackbar } from '~/services/Snackbar';
import Modal from '~/components/Modal';

import { ModalContainer, Input, SubmitButton } from './styles';
import { resetEmailRequest } from '~/store/modules/auth/actions';

const resetSchema = Yup.object().shape({
    newEmail: Yup.string()
        .email(translate('require_email'))
        .required(translate('valid_email')),
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
    const [newEmail, setNewEmail] = useState();

    const passwordRef = useRef();
    const newEmailRef = useRef();

    const onEmailSubmit = () => passwordRef.current.focus();
    const onPasswordSubmit = () => newEmailRef.current.focus();

    const onNewEmailSubmit = () => {
        Keyboard.dismiss();
        resetSchema
            .validate({ email, password, newEmail })
            .then(() => dispatch(resetEmailRequest(email, password, newEmail)))
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
                    placeholder={translate('old_email')}
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
                    placeholder={translate('password')}
                />
                <Input
                    ref={newEmailRef}
                    icon="envelope"
                    value={newEmail}
                    onChangeText={setNewEmail}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="send"
                    blurOnSubmit={false}
                    editable={!loadingReset}
                    selectTextOnFocus={!loadingReset}
                    onSubmitEditing={onNewEmailSubmit}
                    placeholder={translate('new_email')}
                />
                <SubmitButton onPress={onNewEmailSubmit} loading={loadingReset}>
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
