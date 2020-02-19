import styled from 'styled-components/native';
import ActionButton from 'react-native-action-button';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '~/components/Button';

export const Container = styled.View`
    flex: 1;
`;

export const CloseButton = styled(Ripple).attrs({
    rippleContainerBorderRadius: 50,
})`
    height: 40px;
    width: 40px;
    align-self: flex-end;
    justify-content: center;
    border-radius: 50px;
`;

export const CloseIcon = styled(Icon).attrs({
    size: 20,
    color: '#cc6060',
    name: 'close',
})``;

export const ConfirmButton = styled(Button)`
    margin: 0px 20px;
`;

export const AddButton = styled(ActionButton).attrs({
    buttonColor: 'rgba(1, 70, 59, 1)',
    offsetX: 15,
    offsetY: 15,
})``;
