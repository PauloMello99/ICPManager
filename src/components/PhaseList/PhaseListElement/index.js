import React from 'react';
import PropTypes from 'prop-types';
import { differenceInCalendarDays } from 'date-fns';

import {
    Container,
    Description,
    EndIcon,
    ProgressBar,
    Title,
    RowContainer,
} from './styles';

function PhaseListElement({ item, onPress }) {
    const { title, description, endDate, startDate, id } = item;
    const handlePress = () => onPress(id);

    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const total = differenceInCalendarDays(end, start);
    const current = differenceInCalendarDays(today, start);
    const progress = current / total;

    return (
        <Container onPress={handlePress}>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <RowContainer>
                <ProgressBar progress={progress} />
                <EndIcon />
            </RowContainer>
        </Container>
    );
}

PhaseListElement.defaultProps = {
    onPress: null,
};

PhaseListElement.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired,
    onPress: PropTypes.func,
};

export default React.memo(PhaseListElement);
