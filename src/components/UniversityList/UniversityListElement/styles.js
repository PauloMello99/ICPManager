import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';

export const RowContainer = styled(Ripple)`
    width: 100%;
    height: 90px;
    flex-direction: row;
    align-items: center;
    padding: 7px;
`;

export const Container = styled.View`
    margin-left: 10px;
`;

export const Name = styled.Text.attrs({
    numberOfLines: 2,
})`
    font-family: 'Poppins-Bold';
    font-size: 14px;
    color: #6d6e71;
`;

export const Location = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-family: 'Poppins-Regular';
    font-size: 10px;
    color: #6d6e71;
`;
