import styled from 'styled-components/native';
import DefaultModal from 'react-native-modal';

export const Modal = styled(DefaultModal).attrs({
    useNativeDriver: true,
    backdropOpacity: 0.5,
})`
    align-items: center;
    justify-content: center;
`;

export const Container = styled.View`
    background-color: #fff;
    padding: 15px;
    border-radius: 16px;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 40,
})``;
