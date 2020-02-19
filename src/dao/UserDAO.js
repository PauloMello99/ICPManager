import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

export default class UserDAO {
    constructor() {
        this.reference = firebase.database().ref('users');
    }

    async save(id, user) {
        await this.reference.child(id).set(user);
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

    async generateKey() {
        return this.reference.push().key;
    }

    async generateNotificationKey(uid) {
        return this.reference
            .child(uid)
            .child('notifications')
            .push().key;
    }

    async addNotification(uid, notification) {
        await this.reference
            .child(uid)
            .child('notifications')
            .child(notification.id)
            .set(notification);
    }

    async removeNotification(uid, notificationId) {
        await this.reference
            .child(uid)
            .child('notifications')
            .child(notificationId)
            .remove();
    }
}
