import React from 'react';
import { ViewPropTypes, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({
    children,
    loading,
    transparent,
    onPress,
    ...rest
}) {
    return (
        <Container
            loading={loading}
            transparent={transparent}
            onPress={!loading ? onPress : null}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
            ) : (
                <Text transparent={transparent}>{children}</Text>
            )}
        </Container>
    );
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    style: ViewPropTypes.style,
    loading: PropTypes.bool,
    transparent: PropTypes.bool,
    onPress: PropTypes.func,
};

Button.defaultProps = {
    style: {},
    loading: false,
    transparent: false,
    onPress: null,
};
