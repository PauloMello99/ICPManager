import React from 'react';
import PropTypes from 'prop-types';

import ProfilePicture from '~/components/ProfilePicture';

import { Container, Name } from './styles';

function UniversityListElement({ item, onPress }) {
    const { picture, acronym } = item;
    const handlePress = () => onPress(item);
    return (
        <Container onPress={handlePress}>
            <ProfilePicture source={picture} small />
            <Name>{acronym}</Name>
        </Container>
    );
}

UniversityListElement.defaultProps = {
    onPress: () => {},
};

UniversityListElement.propTypes = {
    item: PropTypes.shape({
        picture: PropTypes.string,
        acronym: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired,
    onPress: PropTypes.func,
};

export default React.memo(UniversityListElement);
