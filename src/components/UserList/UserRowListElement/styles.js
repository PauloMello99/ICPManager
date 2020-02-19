import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';

export const Container = styled(Ripple)`
    width: 90px;
    height: 100px;
    align-items: center;
    padding: 7px;
`;

export const Name = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-family: 'Poppins-Bold';
    font-size: 12px;
    color: #6d6e71;
`;

export const Email = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-family: 'Poppins-Regular';
    font-size: 10px;
    color: #6d6e71;
`;
