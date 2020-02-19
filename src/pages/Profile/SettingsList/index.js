import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import translate from '~/languages';

import NavigationService from '~/navigation/NavigationService';
import SettingsListElement from './SettingsListElement';
import ResetPasswordModal from './ResetPasswordModal';
import ResetEmailModal from './ResetEmailModal';

import { Container } from './styles';

export default function SettingsList() {
    const type = useSelector(state => state.auth.type);
    const [showResetEmailModal, setShowResetEmailModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [list, setList] = useState([]);

    const onNewInstituition = () =>
        NavigationService.navigate('CreateUniversity');

    const onResetEmail = () => setShowResetEmailModal(true);
    const onResetPassword = () => setShowResetPasswordModal(true);

    const renderItem = ({ item }) => <SettingsListElement item={item} />;

    useEffect(() => {
        const initList = [
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
        if (type !== 'student') {
            initList.push({
                key: '3',
                icon: 'bank',
                text: translate('profile_create_instituition'),
                onPress: onNewInstituition,
            });
        }
        setList(initList);
    }, [type]);

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
