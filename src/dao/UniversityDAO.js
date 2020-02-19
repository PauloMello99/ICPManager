import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

export default class UniversityDAO {
    constructor() {
        this.reference = firebase.database().ref('universities');
    }

    async save(id, university) {
        await this.reference.child(id).set(university);
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
