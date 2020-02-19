import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Container = styled.View.attrs({
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 6,
})`
    height: 100px;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    margin: 5px 15px;
    background-color: #fff;
    border-radius: 16px;
`;

export const InfoContainer = styled.View`
    flex: 0.6;
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

export const DateText = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-family: 'Poppins-Regular';
    font-size: 12px;
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
    name: 'pencil',
    size: 16,
    color: '#01463B',
})``;

export const DeleteIcon = styled(Icon).attrs({
    name: 'trash',
    size: 16,
    color: '#01463B',
})``;
