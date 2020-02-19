import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { format } from 'date-fns';
import { projects } from '~/services/firebase';
import translate from '~/languages';

import { showErrorSnackbar } from '~/services/Snackbar';

import { loadProjectsFailure, loadProjectsSuccess } from './actions';

const INITIAL_ITEM = {
    title: '--',
    id: '--',
};

export function* loadProjects() {
    const myProjects = [];
    const dots = {};
    const items = {};

    function setDateRangeInfo(
        start,
        end,
        index,
        status,
        itemInfo = INITIAL_ITEM
    ) {
        if (!dots[start]) {
            dots[start] = { dots: [] };
        }
        dots[start].dots.push({ key: index, color: '#479487' });

        if (!items[start]) {
            items[start] = [];
        }
        items[start].push({ ...itemInfo, status: `${status}_START` });

        if (!dots[end]) {
            dots[end] = { dots: [] };
        }
        dots[end].dots.push({ key: index, color: '#943D1B' });
        if (!items[end]) {
            items[end] = [];
        }
        items[end].push({ ...itemInfo, status: `${status}_END` });
    }

    try {
        const { uid, type } = yield select(state => state.auth);
        const response = yield call(projects);
        const allProjects = Object.values(response.val() || []);

        switch (type) {
            case 'student':
                allProjects.forEach(project => {
                    if (project.students && project.students.includes(uid)) {
                        myProjects.push(project);
                    }
                });
                break;
            case 'professor':
                allProjects.forEach(project => {
                    if (
                        project.professors &&
                        project.professors.includes(uid)
                    ) {
                        myProjects.push(project);
                    }
                });
                break;
            case 'coordinator':
                myProjects.push(...allProjects);
                break;
            default: {
                showErrorSnackbar(translate('calendar_request_error'));
                yield put(loadProjectsFailure());
                break;
            }
        }

        myProjects.forEach((project, pIndex, _) => {
            const projectEnd = format(new Date(project.endDate), 'yyyy-MM-dd');
            const projectStart = format(
                new Date(project.startDate),
                'yyyy-MM-dd'
            );

            // PROJECT RANGE
            setDateRangeInfo(projectStart, projectEnd, pIndex, 'PROJECT', {
                title: project.title,
                id: project.id,
            });

            const { phases } = project;
            // PHASES RANGE
            Object.values(phases).forEach((phase, phIndex, _) => {
                const phaseEnd = format(new Date(phase.endDate), 'yyyy-MM-dd');
                const phaseStart = format(
                    new Date(phase.startDate),
                    'yyyy-MM-dd'
                );
                setDateRangeInfo(phaseStart, phaseEnd, phIndex, 'PHASE', {
                    title: phase.title,
                    id: project.id,
                });
            });
        });
        yield put(loadProjectsSuccess(dots, items));
    } catch (error) {
        showErrorSnackbar(translate('calendar_request_error'));
        yield put(loadProjectsFailure());
    }
}

export default all([
    takeLatest('@calendar/LOAD_PROJECTS_REQUEST', loadProjects),
]);
