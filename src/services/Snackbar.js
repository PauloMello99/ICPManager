import Snackbar from 'react-native-snackbar';

export function showSuccessSnackbar(message, delay = 0) {
    setTimeout(() => {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#309500',
            textColor: '#fff',
        });
    }, delay);
}

export function showErrorSnackbar(message, delay = 0) {
    setTimeout(() => {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#cc6060',
            textColor: '#fff',
        });
    }, delay);
}

export function showNeutralSnackbar(message, delay = 0) {
    setTimeout(() => {
        Snackbar.show({
            text: message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#008577',
            textColor: '#fff',
        });
    }, delay);
}
