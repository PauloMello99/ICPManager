import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import translate from '~/languages';

import { Container } from './styles';
import EmptyList from '~/components/EmptyList';
import PhaseListElement from './PhaseListElement';

export default function PhaseList({ list, onDeletePress, onEditPress }) {
    const renderItem = ({ item, index }) => (
        <PhaseListElement
            onDeletePress={onDeletePress}
            onEditPress={onEditPress}
            item={item}
            index={index}
        />
    );

    const EmptyComponent = () => (
        <EmptyList message={translate('create_project_empty_phase')} />
    );

    return (
        <Container>
            <FlatList
                data={list}
                renderItem={renderItem}
                ListEmptyComponent={EmptyComponent}
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
        })
    ).isRequired,
    onEditPress: PropTypes.func.isRequired,
    onDeletePress: PropTypes.func.isRequired,
};
