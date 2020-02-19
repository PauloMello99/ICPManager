import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Modal from '~/components/Modal';
import UniversityForm from '~/components/UniversityForm';

import {
    ModalBackButton,
    ModalBackIcon,
    ModalConfirmIcon,
    ModalContainer,
    RowContainer,
} from './styles';

export default function UniversityModal({
    showModal,
    onDismiss,
    selected,
    onConfirmChange,
}) {
    const [selectedUniversities, setSelected] = useState([]);

    const handleConfirm = () => onConfirmChange(selectedUniversities);

    const onListChange = useCallback(objList => {
        setSelected(objList);
    }, []);
    const handleDismiss = () => {
        setSelected([]);
        onDismiss();
    };

    return (
        <Modal isVisible={showModal} onDismiss={handleDismiss}>
            <ModalContainer>
                <RowContainer>
                    <ModalBackButton onPress={handleDismiss}>
                        <ModalBackIcon />
                    </ModalBackButton>
                    <ModalBackButton onPress={handleConfirm}>
                        <ModalConfirmIcon />
                    </ModalBackButton>
                </RowContainer>
                <UniversityForm
                    initialValue={selected}
                    onInfoChange={onListChange}
                />
            </ModalContainer>
        </Modal>
    );
}

UniversityModal.defaultProps = { selected: [] };

UniversityModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    selected: PropTypes.arrayOf(PropTypes.string),
    onConfirmChange: PropTypes.func.isRequired,
};
