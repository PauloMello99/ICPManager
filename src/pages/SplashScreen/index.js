import React from 'react';
import { useSelector } from 'react-redux';
import NavigationService from '~/navigation/NavigationService';

import { Container, Animation } from './styles';

export default function SplashScreen() {
    const uid = useSelector(state => state.auth.uid);

    setTimeout(
        () =>
            uid
                ? NavigationService.navigate('RootStack')
                : NavigationService.navigate('LoginStack'),
        2000
    );

    return (
        <Container>
            <Animation />
        </Container>
    );
}
