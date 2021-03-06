import React from 'react';
import PropTypes from 'prop-types';

import ProfilePicture from '~/components/ProfilePicture';

import { Container, Email, Name } from './styles';

function UserListElement({ item, onPress }) {
    const { picture, name, email } = item;
    const handlePress = () => onPress(item);

    return (
        <Container onPress={handlePress}>
            <ProfilePicture source={picture} small />
            <Name>{name}</Name>
            <Email>{email}</Email>
        </Container>
    );
}

UserListElement.defaultProps = {
    onPress: null,
};

UserListElement.propTypes = {
    item: PropTypes.shape({
        picture: PropTypes.string,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
    }).isRequired,
    onPress: PropTypes.func,
};

export default React.memo(UserListElement);
