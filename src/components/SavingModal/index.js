import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Container, Loading } from './styles';

export default function SavingModal({ isVisible }) {
    return (
        <Modal isVisible={isVisible}>
            <Container>
                <Loading />
            </Container>
        </Modal>
    );
}

SavingModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
};
