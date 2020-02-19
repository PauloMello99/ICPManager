import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from 'react-navigation-hooks';
import { differenceInDays, subDays } from 'date-fns';
import * as Yup from 'yup';
import translate from '~/languages';

import { showErrorSnackbar } from '~/services/Snackbar';
import { changeStatusBarColor } from '~/store/modules/ui/actions';

import AppBar from '~/components/Appbar';
import Modal from '~/components/Modal';
import InfoForm from '~/components/InfoForm';
import PhaseForm from '~/components/PhaseForm';
import Dot from '~/components/Dot';
import UniversityForm from '~/components/UniversityForm';
import UserForm from '~/components/UserForm';

import ProjectDAO from '~/dao/ProjectDAO';
import UserDAO from '~/dao/UserDAO';
import { coordinators } from '~/services/firebase';

import {
    Container,
    Pager,
    ControlContainer,
    PagerControl,
    DotContainer,
    Button,
    PreviousIcon,
    NextIcon,
    ConfirmIcon,
    SavingIndicator,
    SavingModalContainer,
    Feedback,
    FeedbackButton,
    FeedbackContainer,
} from './styles';

const firstStepSchema = Yup.object().shape({
    endDate: Yup.date()
        .min(new Date(), translate('create_project_valid_end'))
        .required(translate('create_project_require_end_project')),
    startDate: Yup.date()
        .min(subDays(new Date(), 1), translate('create_project_valid_start'))
        .required(translate('create_project_require_start_project')),
    description: Yup.string().required(
        translate('create_project_require_desc_project')
    ),
    title: Yup.string().required(
        translate('create_project_require_title_project')
    ),
});

const secondStepSchema = Yup.object().shape({
    phases: Yup.array().required(translate('create_project_require_phases')),
});

const thirdStepSchema = Yup.object().shape({
    universities: Yup.array().required(
        translate('create_project_require_universities')
    ),
});

export default function CreateProject({ navigation }) {
    const { uid, type, universityList } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const pager = useRef();
    const [index, setIndex] = useState(0);
    const [title, setTitle] = useState(translate('create_project_title.0'));
    const [selectedUniversities, setSelectedUniversities] = useState([]);
    const [saving, setSaving] = useState(false);
    const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);

    const PROJECT_INITIAL_VALUE = {
        startDate: '',
        endDate: '',
        universities: [],
    };

    const [projectObj, setProject] = useState(PROJECT_INITIAL_VALUE);

    const checkFirstStep = async () =>
        firstStepSchema
            .validate(projectObj)
            .then(() => {
                const start = new Date(projectObj.startDate);
                const end = new Date(projectObj.endDate);
                if (differenceInDays(start, end) >= 0) {
                    showErrorSnackbar(
                        translate('create_project_end_after_start')
                    );
                    return;
                }
                setIndex(1);
                setTitle(translate('create_project_title.1'));
                pager.current.setPage(1);
            })
            .catch(({ message }) => showErrorSnackbar(message));

    const checkSecondStep = async () =>
        secondStepSchema
            .validate(projectObj)
            .then(() => {
                setIndex(2);
                setTitle(translate('create_project_title.2'));
                pager.current.setPage(2);
            })
            .catch(({ message }) => showErrorSnackbar(message));

    const checkThirdStep = async () =>
        thirdStepSchema
            .validate(projectObj)
            .then(() => {
                const found =
                    universityList &&
                    universityList.find(un =>
                        projectObj.universities.find(sel => un === sel)
                    );
                if (!found) {
                    showErrorSnackbar(
                        translate(
                            'create_project_require_current_user_universities'
                        )
                    );
                    return;
                }
                setIndex(3);
                setTitle(translate('create_project_title.3'));
                pager.current.setPage(3);
            })
            .catch(({ message }) => showErrorSnackbar(message));

    const checkFourthStep = () => {
        setIndex(4);
        setTitle(translate('create_project_title.4'));
        pager.current.setPage(4);
    };

    const onFirstStepChange = useCallback(
        form =>
            setProject(state => {
                return { ...state, ...form };
            }),
        []
    );

    const onSecondStepChange = useCallback(phases => {
        setProject(state => {
            return { ...state, phases };
        });
    }, []);

    const onThirdStepChange = useCallback(list => {
        const universities = list.map(un => un.id);
        setSelectedUniversities(universities);
        setProject(state => {
            return { ...state, universities };
        });
    }, []);

    const onFourthStepChange = useCallback(professorList => {
        const professors = professorList.map(prof => prof.id);
        setProject(state => {
            return { ...state, professors };
        });
    }, []);

    const onFifthStepChange = useCallback(studentList => {
        const students = studentList.map(std => std.id);
        setProject(state => {
            return { ...state, students };
        });
    }, []);

    const handleConfirmCreation = () => {
        setShowSuccessFeedback(false);
        setSaving(false);
        navigation.goBack();
    };

    const sendNotifications = async (projectId, list) => {
        const dao = new UserDAO();
        const notification = {
            text: projectObj.title,
            key: 'PROJECT_INVITE',
            projectId,
        };

        const results = list.map(async id => {
            const notificationId = await dao.generateNotificationKey(id);
            return dao.addNotification(id, {
                ...notification,
                id: notificationId,
            });
        });

        if (type === 'professor') {
            const coordNotification = {
                text: projectObj.title,
                key: 'PROJECT_ENABLE',
                projectId,
            };
            const res = await coordinators();
            const allCoordinators = Object.values(res.val());

            const coordResults = allCoordinators.map(async coord => {
                const notificationId = await dao.generateNotificationKey(
                    coord.id
                );
                return dao.addNotification(coord.id, {
                    ...coordNotification,
                    id: notificationId,
                });
            });
            Promise.all(coordResults);
        }

        Promise.all(results)
            .then(() => setShowSuccessFeedback(true))
            .catch(() => {
                showErrorSnackbar(translate('create_project_failure'));
                setSaving(false);
            });
    };

    const onSubmitProject = async () => {
        setSaving(true);
        const dao = new ProjectDAO();
        const id = await dao.generateKey();
        const pendingRequest = [
            ...projectObj.professors,
            ...projectObj.students,
        ];

        const project = {
            ...projectObj,
            professors: [uid],
            students: [],
            phases: [],
            enable: type === 'coordinator',
            finished: false,
            id,
        };

        await dao
            .save(id, project)
            .then(async () => {
                const phasesCreation = projectObj.phases.map(phase =>
                    dao.generatePhase(id, phase)
                );
                await Promise.all(phasesCreation);
                sendNotifications(id, pendingRequest);
            })
            .catch(() => {
                showErrorSnackbar(translate('create_project_failure'));
                setSaving(false);
            });
    };

    const handleNext = () => {
        switch (index) {
            case 0:
                checkFirstStep();
                break;
            case 1:
                checkSecondStep();
                break;
            case 2:
                checkThirdStep();
                break;
            case 3:
                checkFourthStep();
                break;
            case 4:
                onSubmitProject();
                break;
            default:
        }
    };

    const handlePrevious = () => {
        if (index === 0) {
            return;
        }
        setTitle(translate(`create_project_title.${index - 1}`));
        setIndex(index - 1);
        pager.current.setPage(index - 1);
    };

    useFocusEffect(
        useCallback(() => {
            dispatch(changeStatusBarColor('#f1f1f1', 'dark-content'));
        }, [dispatch])
    );

    const onBackPress = () => navigation.goBack();

    return (
        <Container>
            <AppBar onBackPress={onBackPress} title={title} />
            <Pager ref={pager}>
                <Container key="0">
                    <InfoForm onInfoChange={onFirstStepChange} />
                </Container>
                <Container key="1">
                    <PhaseForm
                        onInfoChange={onSecondStepChange}
                        projectStartDate={projectObj.startDate}
                        projectEndDate={projectObj.endDate}
                        initialValue={[]}
                    />
                </Container>
                <Container key="2">
                    <UniversityForm onInfoChange={onThirdStepChange} />
                </Container>
                <Container key="3">
                    <UserForm
                        userType="professor"
                        onInfoChange={onFourthStepChange}
                        universities={selectedUniversities}
                    />
                </Container>
                <Container key="4">
                    <UserForm
                        userType="student"
                        onInfoChange={onFifthStepChange}
                        universities={selectedUniversities}
                    />
                </Container>
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
                    <Dot current={index === 2} />
                    <Dot current={index === 3} />
                    <Dot current={index === 4} />
                </DotContainer>
                <ControlContainer>
                    <Button onPress={handleNext}>
                        {index === 4 ? <ConfirmIcon /> : <NextIcon />}
                    </Button>
                </ControlContainer>
            </PagerControl>
            <Modal isVisible={saving} modalType="middle">
                <SavingModalContainer>
                    {showSuccessFeedback ? (
                        <FeedbackContainer>
                            <Feedback>
                                {type === 'coordinator'
                                    ? translate(
                                          'create_project_success_coordinator'
                                      )
                                    : translate(
                                          'create_project_success_professor'
                                      )}
                            </Feedback>
                            <FeedbackButton onPress={handleConfirmCreation}>
                                {translate('create_project_confirm_phase')}
                            </FeedbackButton>
                        </FeedbackContainer>
                    ) : (
                        <SavingIndicator />
                    )}
                </SavingModalContainer>
            </Modal>
        </Container>
    );
}

CreateProject.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        getParam: PropTypes.func.isRequired,
    }).isRequired,
};
