import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import translate from '~/languages';

import UniversityListElement from './UniversityListElement';
import UniversityRowListElement from './UniversityRowListElement';
import EmptyList from '../EmptyList';

import {
    Container,
    EmptyMessage,
    HorizontalSeparator,
    VerticalSeparator,
} from './styles';

export default function UniversityList({
    list,
    refreshing,
    onRefresh,
    onPress,
    horizontal,
}) {
    const renderItem = horizontal
        ? ({ item }) => (
              <UniversityRowListElement item={item} onPress={onPress} />
          )
        : ({ item }) => <UniversityListElement item={item} onPress={onPress} />;

    const EmptyComponent = horizontal
        ? () => (
              <EmptyMessage>{translate('empty_list_university')}</EmptyMessage>
          )
        : () => <EmptyList message={translate('empty_list_university')} />;

    return (
        <Container horizontal={horizontal}>
            <FlatList
                data={list}
                renderItem={renderItem}
                ListEmptyComponent={EmptyComponent}
                ItemSeparatorComponent={
                    horizontal ? HorizontalSeparator : VerticalSeparator
                }
                refreshing={refreshing}
                onRefresh={onRefresh}
                horizontal={horizontal}
            />
        </Container>
    );
}

UniversityList.defaultProps = {
    list: [],
    refreshing: false,
    horizontal: false,
    onRefresh: null,
    onPress: () => {},
};

UniversityList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            picture: PropTypes.string,
            name: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            acronym: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        })
    ),
    horizontal: PropTypes.bool,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    onPress: PropTypes.func,
};
