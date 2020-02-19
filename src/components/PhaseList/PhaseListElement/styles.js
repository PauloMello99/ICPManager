import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Bar } from 'react-native-progress';

export const RowContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Container = styled(Ripple)`
    width: 100%;
    max-height: 90px;
    padding: 10px 20px;
`;

export const Title = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-family: 'Poppins-Bold';
    font-size: 14px;
    color: #6d6e71;
`;

export const Description = styled.Text.attrs({
    numberOfLines: 2,
})`
    font-family: 'Poppins-Regular';
    font-size: 10px;
    color: #6d6e71;
`;

export const ProgressBar = styled(Bar).attrs({
    useNativeDriver: true,
    borderColor: '#ccc',
    color: '#309500',
    width: 270,
    animated: true,
})`
    flex: 0.9;
    width: 10px;
`;

export const EndIcon = styled(Icon).attrs({
    name: 'clock-end',
    size: 25,
    color: '#cc6060',
})``;
