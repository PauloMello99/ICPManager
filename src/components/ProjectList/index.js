import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import translate from '~/languages';

import EmptyList from '~/components/EmptyList';
import ProjectListElement from './ProjectListElement';

export default function ProjectList({ list, onPress, onRefresh, refreshing }) {
    const renderItem = ({ item }) => (
        <ProjectListElement item={item} onPress={onPress} />
    );
    const EmptyComponent = () => (
        <EmptyList message={translate('empty_list_project')} />
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

ProjectList.defaultProps = {
    onPress: () => {},
    onRefresh: null,
    refreshing: false,
};

ProjectList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            enable: PropTypes.bool.isRequired,
            title: PropTypes.string.isRequired,
            phases: PropTypes.objectOf(
                PropTypes.shape({ id: PropTypes.string.isRequired })
            ).isRequired,
            universities: PropTypes.oneOfType([PropTypes.array]).isRequired,
        })
    ).isRequired,
    onPress: PropTypes.func,
    onRefresh: PropTypes.func,
    refreshing: PropTypes.bool,
};
