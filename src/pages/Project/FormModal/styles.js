import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ModalContainer = styled.View`
    flex: 1;
`;

export const RowContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0px 5px;
`;

export const ModalBackButton = styled(Ripple).attrs({
    rippleContainerBorderRadius: 50,
})`
    align-self: flex-end;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
`;

export const ModalBackIcon = styled(Icon).attrs({
    name: 'close',
    size: 30,
    color: '#cc6060',
})``;

export const ModalConfirmIcon = styled(Icon).attrs({
    name: 'check',
    size: 30,
    color: '#309500',
})``;
