import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from 'react-navigation-hooks';
import translate from '~/languages';

import NotificationList from './NotificationList';

import { changeStatusBarColor } from '~/store/modules/ui/actions';
import NavigationService from '~/navigation/NavigationService';
import { notificationsRT } from '~/services/firebase';
import UserDAO from '~/dao/UserDAO';

import { Container, Header, Title, Loading } from './styles';
import ProjectDAO from '~/dao/ProjectDAO';

export default function Notifications() {
    const { uid, type } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    const userDAO = new UserDAO();
    const projectDAO = new ProjectDAO();
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            dispatch(changeStatusBarColor('#01463B', 'light-content'));
        }, [dispatch])
    );

    const onInfoPress = (id, key) =>
        NavigationService.navigate('Project', { id });

    const onPositivePress = async (id, projectId, key) => {
        switch (key) {
            case 'PROJECT_INVITE': {
                await projectDAO.acceptPendingRequest(projectId, uid, type);
                break;
            }
            case 'PROJECT_ENABLE': {
                await projectDAO.enable(projectId);
                break;
            }
            default:
        }
        await userDAO.removeNotification(uid, id);
    };

    const onNegativePress = async (id, projectId, key) => {
        switch (key) {
            case 'PROJECT_INVITE': {
                await projectDAO.acceptPendingRequest(projectId, uid, type);
                break;
            }
            case 'PROJECT_ENABLE': {
                await projectDAO.remove(projectId);
                break;
            }
            default:
        }
        await userDAO.removeNotification(uid, id);
    };

    useEffect(() => {
        const callback = res => {
            const list = Object.values(res.val() || []);
            setNotifications(list);
            if (loading) {
                setLoading(false);
            }
        };

        const getNotifications = async () => {
            await notificationsRT(uid, callback);
        };
        getNotifications();
    }, [dispatch, loading, uid]);

    return (
        <Container>
            <Header>
                <Title>{translate('notifications_title')}</Title>
            </Header>
            {loading ? (
                <Loading />
            ) : (
                <NotificationList
                    list={notifications}
                    onInfoPress={onInfoPress}
                    onNegativePress={onNegativePress}
                    onPosivitePress={onPositivePress}
                />
            )}
        </Container>
    );
}
