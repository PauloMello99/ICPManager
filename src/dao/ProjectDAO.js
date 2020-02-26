import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import translate from '~/languages';
import { showErrorSnackbar } from '~/services/Snackbar';

export default class ProjectDAO {
    constructor() {
        this.reference = firebase.database().ref('projects');
        this.professors = firebase.database().ref('professors');
        this.students = firebase.database().ref('students');
    }

    async save(id, project) {
        await this.reference.child(id).set(project);
    }

    async update(id, info) {
        await this.reference.child(id).update(info);
    }

    async generatePhase(uid, phase) {
        const phaseId = await this.reference
            .child(uid)
            .child('phases')
            .push().key;
        return this.reference
            .child(uid)
            .child('phases')
            .child(phaseId)
            .set({ ...phase, id: phaseId });
    }

    async deletePhase(id, phaseId) {
        await this.reference
            .child(id)
            .child('phases')
            .child(phaseId)
            .remove();
    }

    async updatePhase(id, phaseId, phase) {
        await this.reference
            .child(id)
            .child('phases')
            .child(phaseId)
            .update(phase);
    }

    async setProfessors(id, professors) {
        await this.reference
            .child(id)
            .child('professors')
            .set(professors);
    }

    async setStudents(id, students) {
        await this.reference
            .child(id)
            .child('students')
            .set(students);
    }

    async enable(id) {
        await this.reference
            .child(id)
            .child('enable')
            .set(true);
    }

    async disable(id) {
        await this.reference
            .child(id)
            .child('enable')
            .set(false);
    }

    async remove(id) {
        await this.reference.child(id).remove();
    }

    generateKey() {
        return this.reference.push().key;
    }

    async setUniversities(id, universities) {
        await this.reference
            .child(id)
            .child('universities')
            .set(universities);
    }

    async acceptPendingRequest(id, uid, type) {
        try {
            const project = await this.reference.child(id).once('value');
            const { students = [], professors = [] } = project.val();
            if (type === 'student') {
                if (students && !students.includes(uid)) {
                    students.push(uid);
                    await this.reference
                        .child(id)
                        .child('students')
                        .set(students);
                    return true;
                }
            } else if (professors && !professors.includes(uid)) {
                professors.push(uid);
                await this.reference
                    .child(id)
                    .child('professors')
                    .set(professors);
                return true;
            }
            return false;
        } catch (err) {
            showErrorSnackbar(translate('projects_view_project_failure'));
            return false;
        }
    }
}
