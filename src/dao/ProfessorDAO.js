import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

export default class ProfessorDAO {
    constructor() {
        this.reference = firebase.database().ref('professors');
    }

    async save(id, user) {
        await this.reference.child(id).set(user);
    }

    async update(id, info) {
        return this.reference.child(id).update(info);
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
}
