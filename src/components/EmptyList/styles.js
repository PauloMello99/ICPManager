import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import anim from '~/assets/empty_list.json';

export const Container = styled.View`
    flex: 1;
    align-items: center;
`;

export const Message = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 16px;
    color: #bcbec0;
    margin: 17px 24px;
    text-align: center;
`;

export const LottieEmpty = styled(LottieView).attrs({
    loop: true,
    hardwareAccelerationAndroid: true,
    source: anim,
    autoPlay: true,
})`
    margin-top: 20px;
    width: 100px;
    height: 100px;
`;
