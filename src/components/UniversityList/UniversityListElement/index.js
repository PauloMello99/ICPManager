import React from 'react';
import PropTypes from 'prop-types';

import ProfilePicture from '~/components/ProfilePicture';

import { Container, Location, Name, RowContainer } from './styles';

function UniversityListElement({ item, onPress }) {
    const { picture, name, state, country } = item;
    const handlePress = () => onPress(item);
    return (
        <RowContainer onPress={handlePress}>
            <ProfilePicture source={picture} small />
            <Container>
                <Name>{name}</Name>
                <Location>{`${state} - ${country}`}</Location>
            </Container>
        </RowContainer>
    );
}

UniversityListElement.defaultProps = {
    onPress: () => {},
};

UniversityListElement.propTypes = {
    item: PropTypes.shape({
        picture: PropTypes.string,
        name: PropTypes.string.isRequired,
        acronym: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired,
    onPress: PropTypes.func,
};

export default React.memo(UniversityListElement);
