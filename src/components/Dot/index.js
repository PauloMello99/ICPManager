import React from 'react';
import PropTypes from 'prop-types';

import { Container, Inner } from './styles';

function Dot({ current }) {
    return (
        <Container>
            <Inner current={current} />
        </Container>
    );
}

Dot.propTypes = {
    current: PropTypes.bool.isRequired,
};

export default React.memo(Dot);
