import React from 'react';
import PropTypes from 'prop-types';

import { Container, Message, LottieEmpty } from './styles';

export default function EmptyList({ message }) {
    return (
        <Container>
            <LottieEmpty />
            <Message>{message}</Message>
        </Container>
    );
}

EmptyList.defaultProps = {
    message: 'Lista vazia.',
};

EmptyList.propTypes = {
    message: PropTypes.string,
};
