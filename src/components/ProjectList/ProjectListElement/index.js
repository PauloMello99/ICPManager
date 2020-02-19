import React from 'react';
import PropTypes from 'prop-types';

import {
    Card,
    InfoContainer,
    StatsContainer,
    Title,
    Description,
    RowContainer,
    UniversityIcon,
    TaskIcon,
    Stats,
} from './styles';

export default function ProjectListElement({ item, onPress }) {
    const { description, title, phases, universities, id } = item;
    const handlePress = () => onPress(id);
    return (
        <Card onPress={handlePress}>
            <RowContainer>
                <StatsContainer>
                    <RowContainer>
                        <UniversityIcon />
                        <Stats>{universities ? universities.length : 0}</Stats>
                    </RowContainer>
                    <RowContainer>
                        <TaskIcon />
                        <Stats>
                            {phases ? Object.values(phases).length : 0}
                        </Stats>
                    </RowContainer>
                </StatsContainer>
                <InfoContainer>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </InfoContainer>
            </RowContainer>
        </Card>
    );
}

ProjectListElement.defaultProps = {
    onPress: () => {},
};

ProjectListElement.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        enable: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        phases: PropTypes.objectOf(
            PropTypes.shape({ id: PropTypes.string.isRequired })
        ).isRequired,
        universities: PropTypes.oneOfType([PropTypes.array]).isRequired,
    }).isRequired,
    onPress: PropTypes.func,
};
