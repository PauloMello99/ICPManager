import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

export default class FeedDAO {
    constructor() {
        this.reference = firebase.database().ref('feeds');
    }

    async save(id, feedItem) {
        await this.reference.child(id).set(feedItem);
    }

    async remove(id) {
        await this.reference.child(id).remove();
    }

    generateKey() {
        return this.reference.push().key;
    }
}
