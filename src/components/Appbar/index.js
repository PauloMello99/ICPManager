import React from 'react';
import PropTypes from 'prop-types';

import { AppContainer, BackButton, Title, BackIcon } from './styles';

export default function AppBar({ onBackPress, title, dark }) {
    return (
        <AppContainer testID="app-bar">
            {onBackPress && (
                <BackButton testID="app-bar-back-button" onPress={onBackPress}>
                    <BackIcon dark={dark} />
                </BackButton>
            )}
            {title && <Title dark={dark}>{title}</Title>}
        </AppContainer>
    );
}

AppBar.defaultProps = {
    dark: false,
    title: null,
};

AppBar.propTypes = {
    onBackPress: PropTypes.func.isRequired,
    dark: PropTypes.bool,
    title: PropTypes.string,
};
