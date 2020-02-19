import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';

export const Container = styled(Ripple)`
    width: 90px;
    height: 90px;
    align-items: center;
    padding: 7px;
`;

export const Name = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-family: 'Poppins-Bold';
    font-size: 14px;
    color: #6d6e71;
`;
