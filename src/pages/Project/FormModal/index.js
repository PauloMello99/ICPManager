import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { differenceInDays } from 'date-fns';
import * as Yup from 'yup';
import translate from '~/languages';

import Modal from '~/components/Modal';
import InfoForm from '~/components/InfoForm';
import { showErrorSnackbar } from '~/services/Snackbar';

import {
    ModalContainer,
    ModalBackButton,
    ModalBackIcon,
    ModalConfirmIcon,
    RowContainer,
} from './styles';

const INITIAL_VALUE = {
    title: '',
    description: '',
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
};

export default function FormModal({
    phaseList,
    showModal,
    onDismiss,
    onConfirmChange,
    initialValue = INITIAL_VALUE,
}) {
    const [info, setInfo] = useState(initialValue);

    const schema = Yup.object().shape({
        endDate: Yup.date()
            .min(new Date(), translate('create_project_valid_end'))
            .required(translate('create_project_require_end_project')),
        startDate: Yup.date()
            .min(
                new Date(initialValue.startDate),
                translate('create_project_valid_start')
            )
            .required(translate('create_project_require_start_project')),
        description: Yup.string().required(
            translate('create_project_require_desc_project')
        ),
        title: Yup.string().required(
            translate('create_project_require_title_project')
        ),
    });

    const handleConfirm = async () =>
        schema
            .validate(info)
            .then(() => {
                const start = new Date(info.startDate);
                const end = new Date(info.endDate);
                if (differenceInDays(start, end) >= 0) {
                    showErrorSnackbar(
                        translate('create_project_end_after_start')
                    );
                    return;
                }
                const hasPhaseConflict = phaseList.find(
                    phase =>
                        differenceInDays(new Date(phase.endDate), end) > 0 ||
                        differenceInDays(new Date(phase.startDate), start) < 0
                );
                if (hasPhaseConflict) {
                    showErrorSnackbar(
                        translate('project_edit_info_date_failure')
                    );
                    return;
                }
                onConfirmChange(info);
            })
            .catch(({ message }) => showErrorSnackbar(message));

    const onChange = useCallback(form => setInfo(form), []);

    return (
        <Modal isVisible={showModal} onDismiss={onDismiss} maxHeight="60%">
            <ModalContainer>
                <RowContainer>
                    <ModalBackButton onPress={onDismiss}>
                        <ModalBackIcon />
                    </ModalBackButton>
                    <ModalBackButton onPress={handleConfirm}>
                        <ModalConfirmIcon />
                    </ModalBackButton>
                </RowContainer>
                <InfoForm initialValue={initialValue} onInfoChange={onChange} />
            </ModalContainer>
        </Modal>
    );
}

FormModal.defaultProps = {
    initialValue: INITIAL_VALUE,
};

FormModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onConfirmChange: PropTypes.func.isRequired,
    initialValue: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
    }),
    phaseList: PropTypes.arrayOf(
        PropTypes.shape({
            endDate: PropTypes.string.isRequired,
            startDate: PropTypes.string.isRequired,
        })
    ).isRequired,
};
