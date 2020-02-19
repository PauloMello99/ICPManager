import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import FAIcon from 'react-native-vector-icons/FontAwesome';

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin: 10px;

    border-bottom-width: 1px;
    border-bottom-color: ${props => (props.dark ? '#fff' : ' #6d6e71')};
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#707070',
    numberOfLines: 1,
    editable: false,
})`
    flex: 1;
    margin-left: 5px;
    padding: 5px 0 0 0;

    font-size: 16px;
    font-family: 'Poppins-Regular';

    color: ${props => (props.dark ? '#fff' : ' #6d6e71')};
`;

export const IconContainer = styled(Ripple).attrs({
    rippleContainerBorderRadius: 8,
})`
    flex: 0.1;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
`;

export const LeftIcon = styled(FAIcon).attrs(props => {
    return {
        size: 12,
        color: props.dark ? '#fff' : '#BCBEC0',
        solid: true,
    };
})`
    margin-right: 5px;
    margin-bottom: 5px;
`;

export const Icon = styled(FAIcon).attrs(props => {
    return {
        size: 22,
        color: props.dark ? '#fff' : '#6d6e71',
    };
})``;
