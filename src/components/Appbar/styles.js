import styled from 'styled-components/native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const AppContainer = styled(Appbar).attrs({
    elevation: 0,
})`
    background-color: transparent;
    align-items: center;
`;
export const BackButton = styled.TouchableOpacity`
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    padding: 0px 6px 0px 24px;
`;

export const Title = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-size: 24px;
    font-family: 'Montserrat-Bold';
    color: ${props => (props.dark ? '#fff' : '#01463b')};
`;

export const BackIcon = styled(Icon).attrs(props => {
    return {
        name: 'arrow-left-thick',
        size: 30,
        color: props.dark ? '#ffffff' : '#01463B',
    };
})``;
