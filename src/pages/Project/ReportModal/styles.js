import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';
import Button from '~/components/Button';

export const ModalContainer = styled.View`
    flex: 1;
`;

export const RowContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const SubmitButton = styled(Button)`
    width: 100%;
    margin: 5px 0px;
`;

export const Title = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-family: 'Poppins-Bold';
    font-size: 16px;
    color: #6d6e71;
    align-self: center;
`;

export const NoReport = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-family: 'Poppins-Regular';
    font-size: 14px;
    color: #6d6e71;
    align-self: center;
    margin: 20px 0px;
    flex: 0.7;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 40,
})`
    align-self: center;
    justify-content: center;
`;

export const EditIcon = styled(Icon).attrs({
    name: 'pencil',
    size: 24,
    color: '#01463B',
})``;

export const IconContainer = styled(Ripple).attrs({
    rippleContainerBorderRadius: 50,
})`
    flex: 0.2;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
`;
