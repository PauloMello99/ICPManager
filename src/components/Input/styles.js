import styled from 'styled-components/native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;

    border-bottom-width: 1px;
    border-bottom-color: ${props => (props.dark ? '#fff' : ' #6d6e71')};
`;

export const TInput = styled.TextInput.attrs({
    placeholderTextColor: '#bcbec0',
})`
    flex: 1;
    margin-left: 5px;
    padding: 5px 0 0 0;

    font-size: 16px;
    font-family: 'Poppins-Regular';

    color: ${props => (props.dark ? '#fff' : '#333')};
`;

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})``;

export const ButtonText = styled.Text`
    font-size: 10px;
    font-family: 'Poppins-Regular';
    text-transform: lowercase;

    color: ${props => (props.dark ? '#fff' : '#bcbec0')};
`;

export const Icon = styled(FAIcon).attrs(props => {
    return {
        size: 12,
        color: props.dark ? '#fff' : '#BCBEC0',
        solid: true,
    };
})``;
