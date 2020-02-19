import React from 'react';
import PropTypes from 'prop-types';

import { Container, Input, IconContainer, Icon, LeftIcon } from './styles';

export default function InputPicker({
    icon,
    placeholder,
    value,
    enabled,
    onPress,
    dark,
    leftIcon,
}) {
    return (
        <Container dark={dark}>
            {leftIcon && <LeftIcon name={leftIcon} dark={dark} />}
            <Input placeholder={placeholder} value={value} dark={dark} />
            <IconContainer onPress={enabled ? onPress : null}>
                <Icon name={icon} dark={dark} />
            </IconContainer>
        </Container>
    );
}

InputPicker.defaultProps = {
    placeholder: null,
    icon: 'question',
    leftIcon: null,
    enabled: true,
    dark: false,
    onPress: null,
    value: null,
};

InputPicker.propTypes = {
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    value: PropTypes.string,
    leftIcon: PropTypes.string,
    enabled: PropTypes.bool,
    dark: PropTypes.bool,
    onPress: PropTypes.func,
};
