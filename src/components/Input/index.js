import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Container, TInput, Button, ButtonText, Icon } from './styles';

function Input(
    { style, icon, buttonTitle, onButtonPress, editable, dark, ...rest },
    ref
) {
    return (
        <Container style={style} dark={dark}>
            {icon && <Icon name={icon} dark={dark} />}
            <TInput {...rest} editable={editable} ref={ref} dark={dark} />
            {buttonTitle && buttonTitle.length ? (
                <Button disabled={!editable} onPress={onButtonPress}>
                    <ButtonText dark={dark}>{buttonTitle}</ButtonText>
                </Button>
            ) : (
                <Button disabled={!editable} onPress={onButtonPress} />
            )}
        </Container>
    );
}

Input.defaultProps = {
    icon: null,
    style: {},
    buttonTitle: null,
    onButtonPress: null,
    editable: true,
    dark: true,
};

Input.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    icon: PropTypes.string,
    buttonTitle: PropTypes.string,
    onButtonPress: PropTypes.func,
    editable: PropTypes.bool,
    dark: PropTypes.bool,
};

export default forwardRef(Input);
