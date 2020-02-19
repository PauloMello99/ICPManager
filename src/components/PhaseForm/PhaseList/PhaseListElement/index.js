import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import translate from '~/languages';

import {
    Container,
    InfoContainer,
    Description,
    Title,
    DateText,
    Button,
    DeleteIcon,
    EditIcon,
} from './styles';

function PhaseListElement({ item, onEditPress, onDeletePress, index }) {
    const { title, description, endDate, startDate } = item;
    const handleEdit = () => onEditPress(item, index);
    const handleDelete = () => onDeletePress(item, index);
    const start = format(new Date(startDate), translate('date_format'));
    const end = format(new Date(endDate), translate('date_format'));
    return (
        <Container>
            <InfoContainer>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <DateText>{`${translate(
                    'create_project_phase_start'
                )}${start}`}</DateText>
                <DateText>{`${translate(
                    'create_project_phase_end'
                )}${end}`}</DateText>
            </InfoContainer>
            <Button onPress={handleEdit}>
                <EditIcon />
            </Button>
            <Button onPress={handleDelete}>
                <DeleteIcon />
            </Button>
        </Container>
    );
}

PhaseListElement.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
    }).isRequired,
    onEditPress: PropTypes.func.isRequired,
    onDeletePress: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default React.memo(PhaseListElement);
