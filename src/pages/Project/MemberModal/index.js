import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Modal from '~/components/Modal';
import Dot from '~/components/Dot';
import UserForm from '~/components/UserForm';

import {
    ModalContainer,
    ModalBackButton,
    ModalBackIcon,
    ModalConfirmIcon,
    RowContainer,
    DotContainer,
    Pager,
    PagerControl,
    ControlContainer,
    Button,
    NextIcon,
    PreviousIcon,
} from './styles';

export default function MemberModal({
    showModal,
    onDismiss,
    onConfirmChange,
    universities,
    initialStudents,
    initialProfessors,
}) {
    const pager = useRef();
    const [index, setIndex] = useState(0);

    const [professors, setProfessors] = useState([...initialProfessors]);
    const [students, setStudents] = useState([...initialStudents]);

    const handleNext = () => {
        if (index < 2) {
            setIndex(index + 1);
            pager.current.setPage(index + 1);
        }
    };
    const handlePrevious = () => {
        if (index > 0) {
            setIndex(index - 1);
            pager.current.setPage(index - 1);
        }
    };

    const onProfessorsChange = useCallback(list => {
        const newList = list.map(prof => prof.id);
        setProfessors(newList);
    }, []);

    const onStudentsChange = useCallback(list => {
        const newList = list.map(std => std.id);
        setStudents(newList);
    }, []);

    const handleDismiss = () => {
        setProfessors([...initialProfessors]);
        setStudents([...initialStudents]);
        setIndex(0);
        onDismiss();
    };

    const handleConfirm = () => {
        setIndex(0);
        const newStudents = students.filter(
            std => !initialStudents.find(init => init === std)
        );
        const newProfessors = professors.filter(
            std => !initialProfessors.find(init => init === std)
        );
        const oldStudents = students.filter(std =>
            initialStudents.find(init => init === std)
        );
        const oldProfessors = professors.filter(std =>
            initialProfessors.find(init => init === std)
        );
        onConfirmChange(
            [...newProfessors, ...newStudents],
            oldProfessors,
            oldStudents
        );
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
                <Pager ref={pager}>
                    <ModalContainer key="0">
                        <UserForm
                            onInfoChange={onProfessorsChange}
                            universities={universities}
                            initialValue={initialProfessors}
                            userType="professor"
                        />
                    </ModalContainer>
                    <ModalContainer key="1">
                        <UserForm
                            onInfoChange={onStudentsChange}
                            universities={universities}
                            initialValue={initialStudents}
                            userType="student"
                        />
                    </ModalContainer>
                </Pager>
                <PagerControl>
                    <ControlContainer>
                        {index !== 0 && (
                            <Button onPress={handlePrevious}>
                                <PreviousIcon />
                            </Button>
                        )}
                    </ControlContainer>
                    <DotContainer>
                        <Dot current={index === 0} />
                        <Dot current={index === 1} />
                    </DotContainer>
                    <ControlContainer>
                        <Button onPress={handleNext}>
                            {index === 1 ? null : <NextIcon />}
                        </Button>
                    </ControlContainer>
                </PagerControl>
            </ModalContainer>
        </Modal>
    );
}
MemberModal.defaultProps = {
    universities: [],
    initialStudents: [],
    initialProfessors: [],
};

MemberModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onConfirmChange: PropTypes.func.isRequired,
    universities: PropTypes.arrayOf(PropTypes.string.isRequired),
    initialStudents: PropTypes.arrayOf(PropTypes.string.isRequired),
    initialProfessors: PropTypes.arrayOf(PropTypes.string.isRequired),
};
