import React from 'react';
import './config/ReactotronConfig';
import { View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { createAppContainer } from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/NavigationService';

import StatusBar from '~/components/StatusBar';

const AppContainer = createAppContainer(AppNavigator);

// console.disableYellowBox = true;

export default function App() {
    Orientation.lockToPortrait();

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBar />
                    <AppContainer
                        ref={ref => NavigationService.setTopLevel(ref)}
                    />
                </View>
            </PersistGate>
        </Provider>
    );
}
