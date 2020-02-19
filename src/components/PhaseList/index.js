import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import translate from '~/languages';

import EmptyList from '../EmptyList';
import PhaseListElement from './PhaseListElement';

import { Container, Separator } from './styles';

export default function PhaseList({ list }) {
    const onPress = () => {};

    const renderItem = ({ item }) => (
        <PhaseListElement item={item} onPress={onPress} />
    );

    const EmptyComponent = () => (
        <EmptyList message={translate('empty_list_phase')} />
    );

    const keyExtractor = item => item.id;

    return (
        <Container>
            <FlatList
                data={list}
                renderItem={renderItem}
                ListEmptyComponent={EmptyComponent}
                ItemSeparatorComponent={Separator}
                keyExtractor={keyExtractor}
            />
        </Container>
    );
}

PhaseList.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            endDate: PropTypes.string.isRequired,
            startDate: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
};
