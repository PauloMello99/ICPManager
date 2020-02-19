import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import splash from '~/assets/splash_loading.json';

export const Container = styled.View`
    flex: 1;
    background: #fff;
    align-items: center;
    justify-content: center;
`;

export const Animation = styled(LottieView).attrs({
    loop: true,
    hardwareAccelerationAndroid: true,
    source: splash,
    autoPlay: true,
})``;
