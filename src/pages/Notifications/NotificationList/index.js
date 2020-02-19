import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import translate from '~/languages';

import NotificationListElement from './NotificationListElement';
import EmptyList from '~/components/EmptyList';

export default function NotificationList({
    list,
    onInfoPress,
    onPosivitePress,
    onNegativePress,
    onRefresh,
    refreshing,
}) {
    const renderItem = ({ item }) => (
        <NotificationListElement
            item={item}
            onPosivitePress={onPosivitePress}
            onNegativePress={onNegativePress}
            onInfoPress={onInfoPress}
        />
    );
    const EmptyComponent = () => (
        <EmptyList message={translate('notifications_empty_list')} />
    );

    const keyExtractor = item => item.id;

    return (
        <FlatList
            data={list}
            renderItem={renderItem}
            ListEmptyComponent={EmptyComponent}
            keyExtractor={keyExtractor}
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
    );
}

NotificationList.defaultProps = {
    onInfoPress: () => {},
    onPosivitePress: () => {},
    onNegativePress: () => {},
    onRefresh: null,
    refreshing: false,
};

NotificationList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            projectId: PropTypes.string.isRequired,
        })
    ).isRequired,

    onInfoPress: PropTypes.func,
    onPosivitePress: PropTypes.func,
    onNegativePress: PropTypes.func,
    onRefresh: PropTypes.func,
    refreshing: PropTypes.bool,
};
