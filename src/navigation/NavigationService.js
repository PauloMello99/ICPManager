import { NavigationActions } from 'react-navigation';
import { BackHandler } from 'react-native';

let navigator;

function setTopLevel(ref) {
    navigator = ref;
}

function navigate(routeName, params) {
    navigator.dispatch(NavigationActions.navigate({ routeName, params }));
}

function setBackButtonCallback(callback) {
    BackHandler.addEventListener('hardwareBackPress', () => {
        callback();
        return true;
    });
}

function removeBackButtonCallback() {
    BackHandler.removeEventListener('hardwareBackPress', null);
}

function goBack() {
    navigator.dispatch(NavigationActions.back());
}

export default {
    setTopLevel,
    navigate,
    setBackButtonCallback,
    removeBackButtonCallback,
    goBack,
};
