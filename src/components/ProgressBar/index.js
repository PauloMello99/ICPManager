import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { Container, BackgroundContainer, Progress } from './styles';

export default function ProgressBar({ progress, color, style }) {
    return (
        <Container style={style}>
            <BackgroundContainer>
                <Progress progress={progress} color={color} />
            </BackgroundContainer>
        </Container>
    );
}

ProgressBar.defaultProps = {
    progress: 0,
    color: '#309500',
    style: {},
};

ProgressBar.propTypes = {
    progress: PropTypes.number,
    color: PropTypes.string,
    style: ViewPropTypes.style,
};
