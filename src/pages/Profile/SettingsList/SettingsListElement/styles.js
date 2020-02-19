import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import MAIcon from 'react-native-vector-icons/FontAwesome';

export const Container = styled(Ripple)`
    width: 100%;
    height: 50px;
    background-color: transparent;
    margin: 5px 0px;
    align-items: center;
    flex-direction: row;
`;

export const Text = styled.Text.attrs({
    numberOfLines: 2,
})`
    font-size: 14px;
    font-family: 'Poppins-Regular';
    color: #707070;
    flex: 0.9;
`;

export const Icon = styled(MAIcon).attrs(props => {
    return {
        size: 18,
        name: props.name,
        color: '#707070',
    };
})`
    flex: 0.1;
`;
