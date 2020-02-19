import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import translate from '~/languages';

import NavigationService from '~/navigation/NavigationService';
import UserListElement from './UserListElement';
import UserRowListElement from './UserRowListElement';
import EmptyList from '../EmptyList';

import {
    Container,
    EmptyMessage,
    HorizontalSeparator,
    VerticalSeparator,
} from './styles';

export default function UserList({
    list,
    userType,
    refreshing,
    onRefresh,
    goToProfile,
    onPress,
    horizontal,
}) {
    const handlePress = item => {
        if (onPress) {
            onPress(item);
            return;
        }
        if (goToProfile) {
            switch (userType) {
                case 'student':
                    NavigationService.navigate('Student', { id: item.id });
                    break;
                case 'professor':
                    NavigationService.navigate('Professor', { id: item.id });
                    break;
                case 'coordinator':
                    NavigationService.navigate('Professor', { id: item.id });
                    break;
                default:
            }
        }
    };

    const renderItem = horizontal
        ? ({ item }) => <UserRowListElement item={item} onPress={handlePress} />
        : ({ item }) => <UserListElement item={item} onPress={handlePress} />;

    const EmptyComponent = () => {
        let message;
        switch (userType) {
            case 'student':
                message = translate('empty_list_student');
                break;
            case 'professor':
                message = translate('empty_list_professor');
                break;
            case 'coordinator':
                message = translate('empty_list_professor');
                break;
            default:
                message = 'error';
                break;
        }
        return horizontal ? (
            <EmptyMessage>{message}</EmptyMessage>
        ) : (
            <EmptyList message={message} />
        );
    };

    const keyExtractor = item => item.id;

    return (
        <Container horizontal={horizontal}>
            <FlatList
                data={list}
                renderItem={renderItem}
                ListEmptyComponent={EmptyComponent}
                ItemSeparatorComponent={
                    horizontal ? HorizontalSeparator : VerticalSeparator
                }
                keyExtractor={keyExtractor}
                refreshing={refreshing}
                onRefresh={onRefresh}
                horizontal={horizontal}
            />
        </Container>
    );
}

UserList.defaultProps = {
    list: [],
    refreshing: false,
    onRefresh: null,
    goToProfile: false,
    horizontal: false,
    onPress: null,
};

UserList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            picture: PropTypes.string,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
        })
    ),
    userType: PropTypes.string.isRequired,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    goToProfile: PropTypes.bool,
    horizontal: PropTypes.bool,
    onPress: PropTypes.func,
};
