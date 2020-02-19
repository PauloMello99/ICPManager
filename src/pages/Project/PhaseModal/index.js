import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Modal from '~/components/Modal';
import PhaseForm from '~/components/PhaseForm';

import {
    ModalContainer,
    ModalBackButton,
    ModalBackIcon,
    ModalConfirmIcon,
    RowContainer,
} from './styles';

export default function PhaseModal({
    showModal,
    onDismiss,
    onConfirmChange,
    startDate,
    endDate,
    initialValue = [],
}) {
    const [list, setList] = useState([...initialValue]);

    const onChange = useCallback(phases => setList(phases), []);

    const onConfirm = useCallback(() => {
        const updatedPhases = list.filter(phase => phase.id);
        const newPhases = list.filter(phase => !phase.id);
        const removedPhases = initialValue.filter(
            initPhase => !list.find(phase => phase.id === initPhase.id)
        );
        onConfirmChange(updatedPhases, newPhases, removedPhases);
    }, [list]);

    const handleDismiss = useCallback(() => {
        setList([...initialValue]);
        onDismiss();
    }, [initialValue]);

    return (
        <Modal isVisible={showModal} onDismiss={handleDismiss}>
            <ModalContainer>
                <RowContainer>
                    <ModalBackButton onPress={handleDismiss}>
                        <ModalBackIcon />
                    </ModalBackButton>
                    <ModalBackButton onPress={onConfirm}>
                        <ModalConfirmIcon />
                    </ModalBackButton>
                </RowContainer>
                <PhaseForm
                    projectEndDate={endDate}
                    projectStartDate={startDate}
                    onInfoChange={onChange}
                    initialValue={list}
                />
            </ModalContainer>
        </Modal>
    );
}

PhaseModal.defaultProps = {
    initialValue: [],
};

PhaseModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onConfirmChange: PropTypes.func.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    initialValue: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            endDate: PropTypes.string.isRequired,
            startDate: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        })
    ),
};
