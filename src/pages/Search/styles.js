import styled from 'styled-components/native';
import ActionButton from 'react-native-action-button';
import CustomInput from '~/components/Input';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    background-color: #01463b;
    padding: 14px 24px;
    align-items: center;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    z-index: 2;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-family: 'Montserrat-Bold';
    color: #ffffff;
    margin-bottom: 10px;
`;

export const Input = styled(CustomInput).attrs({
    numberOfLines: 1,
    icon: 'filter',
})`
    margin-top: 15px;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 40,
})`
    align-self: center;
    margin-top: 40px;
`;

export const AddButton = styled(ActionButton).attrs({
    buttonColor: 'rgba(1, 70, 59, 1)',
    offsetX: 15,
    offsetY: 15,
})``;
