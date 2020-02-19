import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevel(ref) {
    navigator = ref;
}

function navigate(routeName, params) {
    navigator.dispatch(NavigationActions.navigate({ routeName, params }));
}

export default {
    setTopLevel,
    navigate,
};
