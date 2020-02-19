import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { addDays, subDays, differenceInDays } from 'date-fns';
import translate from '~/languages';

import PhaseList from './PhaseList';
import Modal from '~/components/Modal';
import InfoForm from '~/components/InfoForm';

import { showErrorSnackbar } from '~/services/Snackbar';

import {
    Container,
    CloseButton,
    CloseIcon,
    ConfirmButton,
    AddButton,
} from './styles';

export default function PhaseForm({
    onInfoChange,
    projectStartDate = new Date().toDateString(),
    projectEndDate = new Date().toDateString(),
    initialValue = [],
}) {
    const [showModal, setShowModal] = useState(false);
    const [phaseList, setPhaseList] = useState(initialValue);
    const [currentPhase, setCurrentPhase] = useState({});
    const [currentIndex, setCurrenIndex] = useState(
        initialValue.length > 0 ? initialValue.length : -1
    );

    const currentPhaseId = useRef(0);

    const todayLimit = subDays(new Date(), 1);

    const minStart = projectStartDate ? new Date(projectStartDate) : todayLimit;

    const maxStart = projectStartDate
        ? subDays(new Date(projectEndDate), 1)
        : todayLimit;

    const minEnd = projectEndDate
        ? addDays(new Date(projectStartDate), 1)
        : todayLimit;

    const maxEnd = projectEndDate ? new Date(projectEndDate) : todayLimit;

    const phaseSchema = Yup.object().shape({
        endDate: Yup.date()
            .min(minEnd, translate('create_project_end_after_start'))
            .max(maxEnd, translate('create_project_valid_end'))
            .required(translate('create_project_require_end_phase')),
        startDate: Yup.date()
            .min(minStart, translate('create_project_valid_start'))
            .max(maxStart, translate('create_project_end_after_start'))
            .required(translate('create_project_require_start_phase')),
        description: Yup.string().required(
            translate('create_project_require_desc_phase')
        ),
        title: Yup.string().required(
            translate('create_project_require_title_phase')
        ),
    });

    const closeModal = () => setShowModal(false);
    const openModal = () => {
        currentPhaseId.current = null;
        setCurrenIndex(phaseList.length);
        setCurrentPhase();
        setShowModal(true);
    };

    const onDeletePress = (item, index) => {
        const list = [...phaseList];
        list.splice(index, 1);
        setPhaseList(list);
        onInfoChange(list);
    };

    const onEditPress = (item, index) => {
        setCurrenIndex(index);
        setCurrentPhase(item);
        currentPhaseId.current = item.id || null;
        setShowModal(true);
    };

    const onCurrentPhaseChange = useCallback(
        item => setCurrentPhase({ ...item, id: currentPhaseId.current }),
        []
    );

    const handleSubmit = async () =>
        phaseSchema
            .validate(currentPhase)
            .then(() => {
                const start = new Date(currentPhase.startDate);
                const end = new Date(currentPhase.endDate);
                if (differenceInDays(start, end) >= 0) {
                    showErrorSnackbar(
                        translate('create_project_end_after_start')
                    );
                    return;
                }
                if (currentIndex !== -1) {
                    setPhaseList(state => {
                        state[currentIndex] = currentPhase;
                        return state;
                    });
                } else {
                    setPhaseList(state => {
                        state.push(currentPhase);
                        return state;
                    });
                }
                onInfoChange(phaseList);
                setCurrentPhase();
                closeModal();
            })
            .catch(({ message }) => showErrorSnackbar(message));

    return (
        <Container>
            <PhaseList
                onDeletePress={onDeletePress}
                onEditPress={onEditPress}
                list={phaseList}
            />
            <AddButton onPress={openModal} />
            <Modal
                isVisible={showModal}
                modalType="middle"
                onDismiss={closeModal}
            >
                <CloseButton onPress={closeModal}>
                    <CloseIcon />
                </CloseButton>
                <InfoForm
                    onInfoChange={onCurrentPhaseChange}
                    initialValue={currentPhase}
                />
                <ConfirmButton onPress={handleSubmit}>
                    {translate('create_project_confirm_phase')}
                </ConfirmButton>
            </Modal>
        </Container>
    );
}

PhaseForm.defaultProps = {
    projectStartDate: new Date().toDateString(),
    projectEndDate: new Date().toDateString(),
    initialValue: [],
};

PhaseForm.propTypes = {
    onInfoChange: PropTypes.func.isRequired,
    projectStartDate: PropTypes.string,
    projectEndDate: PropTypes.string,
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
