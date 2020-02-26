import React, { useState } from 'react';
import { FlatList } from 'react-native';
import translate from '~/languages';

import SettingsListElement from './SettingsListElement';
import ResetPasswordModal from './ResetPasswordModal';
import ResetEmailModal from './ResetEmailModal';

import { Container } from './styles';

export default function SettingsList() {
    const [showResetEmailModal, setShowResetEmailModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

    const onResetEmail = () => setShowResetEmailModal(true);
    const onResetPassword = () => setShowResetPasswordModal(true);

    const renderItem = ({ item }) => <SettingsListElement item={item} />;

    const list = [
        {
            key: '1',
            icon: 'unlock',
            text: translate('profile_reset_password'),
            onPress: onResetPassword,
        },
        {
            key: '2',
            icon: 'envelope',
            text: translate('profile_reset_email'),
            onPress: onResetEmail,
        },
    ];

    const onDismiss = () => {
        setShowResetPasswordModal(false);
        setShowResetEmailModal(false);
    };

    return (
        <Container>
            <FlatList data={list} renderItem={renderItem} />
            <ResetPasswordModal
                showModal={showResetPasswordModal}
                onDismiss={onDismiss}
            />
            <ResetEmailModal
                showModal={showResetEmailModal}
                onDismiss={onDismiss}
            />
        </Container>
    );
}
