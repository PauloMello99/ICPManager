import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ripple from 'react-native-material-ripple';

export const Container = styled.View`
    height: 100px;
    flex-direction: row;
    align-items: center;
    margin: 5px 15px;
    background-color: #fff;
    border-radius: 16px;
`;

export const InfoContainer = styled(Ripple)`
    flex: 0.8;
    height: 100%;
    justify-content: center;
    padding: 10px;
`;

export const Title = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-family: 'Poppins-Bold';
    font-size: 14px;
    color: #6d6e71;
`;

export const Description = styled.Text.attrs({
    numberOfLines: 3,
})`
    font-family: 'Poppins-Regular';
    font-size: 10px;
    color: #6d6e71;
`;

export const Button = styled(Ripple)`
    flex: 0.2;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const EditIcon = styled(Icon).attrs({
    name: 'check',
    size: 16,
    color: '#01463B',
})``;

export const DeleteIcon = styled(Icon).attrs({
    name: 'trash',
    size: 16,
    color: '#01463B',
})``;
