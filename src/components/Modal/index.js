import React from 'react';
import PropTypes from 'prop-types';

import {
    BottomContainer,
    MiddleContainer,
    ModalContainer,
    ScrollContainer,
} from './styles';

export default function CustomModal({
    children,
    isVisible,
    onDismiss,
    modalType,
    maxHeight,
}) {
    switch (modalType) {
        case 'bottom':
            return (
                <BottomContainer
                    isVisible={isVisible}
                    onDismiss={onDismiss}
                    onBackdropPress={onDismiss}
                    onBackButtonPress={onDismiss}
                >
                    <ModalContainer maxHeight="33%" type="bottom">
                        <ScrollContainer keyboardShouldPersistTaps="handled">
                            {children}
                        </ScrollContainer>
                    </ModalContainer>
                </BottomContainer>
            );
        case 'middle':
            return (
                <MiddleContainer
                    isVisible={isVisible}
                    onDismiss={onDismiss}
                    onBackdropPress={onDismiss}
                >
                    <ModalContainer maxHeight="70%" type="middle">
                        <ScrollContainer keyboardShouldPersistTaps="handled">
                            {children}
                        </ScrollContainer>
                    </ModalContainer>
                </MiddleContainer>
            );
        default:
            return (
                <BottomContainer
                    isVisible={isVisible}
                    onDismiss={onDismiss}
                    onBackdropPress={onDismiss}
                    default
                >
                    <ModalContainer type="bottom" maxHeight={maxHeight} default>
                        {children}
                    </ModalContainer>
                </BottomContainer>
            );
    }
}

CustomModal.defaultProps = {
    modalType: null,
    maxHeight: null,
};

CustomModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onDismiss: PropTypes.func.isRequired,
    modalType: PropTypes.oneOf(['bottom', 'middle']),
    maxHeight: PropTypes.string,
};
