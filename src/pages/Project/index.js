import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from 'react-navigation-hooks';
import { differenceInCalendarDays } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import translate from '~/languages';

import TabView from './TabView';
import FormModal from './FormModal';
import MemberModal from './MemberModal';
import PhaseModal from './PhaseModal';

import AppBar from '~/components/Appbar';
import UserList from '~/components/UserList';
import PhaseList from '~/components/PhaseList';
import SavingModal from '~/components/SavingModal';
import UniversityModal from '~/components/UniversityModal';

import ProjectDAO from '~/dao/ProjectDAO';
import UserDAO from '~/dao/UserDAO';

import { changeStatusBarColor } from '~/store/modules/ui/actions';
import { showErrorSnackbar, showSuccessSnackbar } from '~/services/Snackbar';

import {
    projectRT,
    students as getStudents,
    professors as getProfessors,
} from '~/services/firebase';

import {
    Container,
    Description,
    Title,
    Header,
    ProgressContainer,
    StartIcon,
    EndIcon,
    ProgressBar,
    Loading,
    Separator,
    ActionButton,
    SettingsIcon,
    EditMembersIcon,
    EditPhasesIcon,
    EditProjectIcon,
    EditInstituitionsIcon,
} from './styles';

export default function Project({ navigation }) {
    const { uid, type } = useSelector(state => state.auth);
    const id = navigation.getParam('id');
    const dispatch = useDispatch();
    const dao = new ProjectDAO();

    const [showEdiInstituitions, setShowEdiInstituitions] = useState(false);
    const [showEditPhases, setShowEditPhases] = useState(false);
    const [showEditMembers, setShowEditMembers] = useState(false);
    const [showEditProject, setShowEditProject] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [info, setInfo] = useState();

    const [universitiesId, setUniversitiesId] = useState([]);
    const [professorsId, setProfessorsId] = useState([]);
    const [studentsId, setStudentsId] = useState([]);

    const [professorList, setProfessorList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [phaseList, setPhases] = useState([]);

    const [tabState, setTabState] = useState({
        index: 0,
        routes: [
            { key: 'first', title: translate('phases') },
            { key: 'second', title: translate('students') },
            { key: 'third', title: translate('professors') },
        ],
    });

    const phaseContainer = <PhaseList list={phaseList} />;
    const studentContainer = <UserList list={studentList} userType="student" />;
    const professorContainer = (
        <UserList list={professorList} userType="professor" />
    );

    const onBackPress = () => navigation.goBack();

    const fetchStudents = async students => {
        if (!students) {
            setStudentList([]);
            return;
        }
        const res = await getStudents();
        const listVal = Object.values(res.val() || []);
        const list = students.map(stdId =>
            listVal.find(std => std.id === stdId)
        );
        setStudentList(list);
    };

    const fetchProfessors = async professors => {
        if (!professors) {
            setProfessorList([]);
            return;
        }
        const res = await getProfessors();
        const listVal = Object.values(res.val() || []);
        const list = professors.map(prfId =>
            listVal.find(std => std.id === prfId)
        );
        setProfessorList(list);
    };

    const renderScene = useCallback(
        ({ route }) => {
            switch (route.key) {
                case 'first':
                    return phaseContainer;
                case 'second':
                    return studentContainer;
                case 'third':
                    return professorContainer;
                default:
                    return null;
            }
        },
        [phaseContainer, professorContainer, studentContainer]
    );

    const onTabChange = useCallback(
        index => setTabState(state => ({ ...state, index })),
        []
    );

    const loadProject = useCallback(async () => {
        await projectRT(id, snapshot => {
            try {
                const {
                    title = '',
                    description = '',
                    startDate = new Date().toDateString(),
                    endDate = new Date().toDateString(),
                    phases = [],
                    students = [],
                    professors = [],
                    universities = [],
                } = snapshot.val();

                const today = new Date();
                const start = new Date(startDate);
                const end = new Date(endDate);
                const total = differenceInCalendarDays(end, start);
                const current = differenceInCalendarDays(today, start);
                setProgress(current / total);
                setInfo({ title, description, startDate, endDate });
                setPhases(Object.values(phases));

                setStudentsId(students);
                setProfessorsId(professors);
                setUniversitiesId(universities);

                fetchProfessors(professors);
                fetchStudents(students);

                const isProjectMember = professors.find(prof => prof === uid);
                if (isProjectMember || type === 'coordinator') {
                    setShowSettings(true);
                }

                setLoading(false);
            } catch (err) {
                showErrorSnackbar(translate('projects_view_project_failure'));
                navigation.goBack();
            }
        });
    }, [id, navigation, type, uid]);

    const renderIcon = () => <SettingsIcon />;

    const sendNotifications = async list => {
        const userDAO = new UserDAO();
        const notification = {
            text: info.title,
            key: 'PROJECT_INVITE',
            projectId: id,
        };

        const results = list.map(async userId => {
            const notificationId = await userDAO.generateNotificationKey(
                userId
            );
            return userDAO.addNotification(userId, {
                ...notification,
                id: notificationId,
            });
        });
        return Promise.all(results);
    };

    const onEditMembers = async (newMembers, professors, students) => {
        setShowEditMembers(false);
        setSaving(true);
        try {
            await dao.setStudents(id, students);
            await dao.setProfessors(id, [...professors, uid]);
            if (newMembers.length) {
                await sendNotifications(newMembers);
            }
            setSaving(false);
            showSuccessSnackbar(translate('project_send_new_invite_success'));
        } catch (err) {
            setSaving(false);
            showErrorSnackbar(translate('project_edit_save_failure'));
        }
    };

    const onEditProjectInfo = async newInfo => {
        setShowEditProject(false);
        setSaving(true);
        try {
            await dao.update(id, newInfo);
            setSaving(false);
        } catch (err) {
            setSaving(false);
            showErrorSnackbar(translate('project_edit_save_failure'));
        }
    };

    const onEditPhases = async (updatedItems, newItems, removedItems) => {
        setShowEditPhases(false);
        setSaving(true);
        try {
            if (newItems.length > 0) {
                const newPhases = newItems.map(phase =>
                    dao.generatePhase(id, phase)
                );
                await Promise.all(newPhases);
            }
            if (removedItems.length > 0) {
                const removedIPhases = removedItems.map(phase =>
                    dao.deletePhase(id, phase.id)
                );
                await Promise.all(removedIPhases);
            }
            const updatePhases = updatedItems.map(phase =>
                dao.updatePhase(id, phase.id, phase)
            );
            await Promise.all(updatePhases);
            setSaving(false);
        } catch (err) {
            setSaving(false);
            showErrorSnackbar(translate('project_edit_save_failure'));
        }
    };

    const onEditUniversities = async universities => {
        setSaving(true);
        const ids = universities.map(un => un.id);

        const hasInitialUniversities = ids.find(uId =>
            universitiesId.find(un => un === uId)
        );

        if (hasInitialUniversities) {
            setShowEdiInstituitions(false);
            try {
                await dao.setUniversities(id, ids);
                setSaving(false);
            } catch (err) {
                setSaving(false);
                showErrorSnackbar(translate('project_edit_save_failure'));
            }
        } else {
            setSaving(false);
            showErrorSnackbar(translate('project_edit_universities_failure'));
        }
    };

    const openEditInstituitions = () => setShowEdiInstituitions(true);
    const dismissEditInstituitions = () => setShowEdiInstituitions(false);

    const openEditMembers = () => setShowEditMembers(true);
    const dismissEditMembers = () => setShowEditMembers(false);

    const openEditPhases = () => setShowEditPhases(true);
    const dismissEditPhases = () => setShowEditPhases(false);

    const openEditProject = () => setShowEditProject(true);
    const dismissEditProject = () => setShowEditProject(false);

    useEffect(() => {
        loadProject();
    }, [loadProject]);

    useFocusEffect(
        useCallback(() => {
            dispatch(changeStatusBarColor('#f1f1f1', 'dark-content'));
        }, [dispatch])
    );

    return (
        <Container>
            <AppBar title={translate('project')} onBackPress={onBackPress} />
            <Separator />
            {!loading ? (
                <Container>
                    <Header>
                        <Title>{info.title}</Title>
                        <Description>{info.description}</Description>
                    </Header>
                    <ProgressContainer>
                        <StartIcon />
                        <ProgressBar progress={progress} />
                        <EndIcon />
                    </ProgressContainer>
                    <TabView
                        navigationState={tabState}
                        renderScene={renderScene}
                        onIndexChange={onTabChange}
                    />
                    {showSettings && (
                        <ActionButton renderIcon={renderIcon} active={false}>
                            <ActionButton.Item
                                buttonColor="#008577"
                                useNativeFeedback
                                hideShadow
                                size={46}
                                title={translate('instituitions')}
                                onPress={openEditInstituitions}
                            >
                                <EditInstituitionsIcon />
                            </ActionButton.Item>
                            <ActionButton.Item
                                buttonColor="#008577"
                                useNativeFeedback
                                hideShadow
                                size={46}
                                title={translate('members')}
                                onPress={openEditMembers}
                            >
                                <EditMembersIcon />
                            </ActionButton.Item>
                            <ActionButton.Item
                                buttonColor="#008577"
                                useNativeFeedback
                                hideShadow
                                size={46}
                                title={translate('phases')}
                                onPress={openEditPhases}
                            >
                                <EditPhasesIcon />
                            </ActionButton.Item>
                            <ActionButton.Item
                                buttonColor="#008577"
                                useNativeFeedback
                                hideShadow
                                size={46}
                                title={translate('project')}
                                onPress={openEditProject}
                            >
                                <EditProjectIcon />
                            </ActionButton.Item>
                        </ActionButton>
                    )}
                    <FormModal
                        showModal={showEditProject}
                        onDismiss={dismissEditProject}
                        onConfirmChange={onEditProjectInfo}
                        initialValue={info}
                        phaseList={phaseList}
                    />
                    <MemberModal
                        universities={universitiesId}
                        initialProfessors={professorsId}
                        initialStudents={studentsId}
                        onDismiss={dismissEditMembers}
                        showModal={showEditMembers}
                        onConfirmChange={onEditMembers}
                    />
                    <PhaseModal
                        onDismiss={dismissEditPhases}
                        showModal={showEditPhases}
                        endDate={info.endDate}
                        startDate={info.startDate}
                        initialValue={phaseList}
                        onConfirmChange={onEditPhases}
                    />
                    <UniversityModal
                        onConfirmChange={onEditUniversities}
                        onDismiss={dismissEditInstituitions}
                        selected={universitiesId}
                        showModal={showEdiInstituitions}
                    />
                    <SavingModal isVisible={saving} />
                </Container>
            ) : (
                <Loading />
            )}
        </Container>
    );
}

Project.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        getParam: PropTypes.func.isRequired,
    }).isRequired,
};
