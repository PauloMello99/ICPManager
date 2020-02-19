import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DefaultInput from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
    flex: 1;
    background: #f1f1f1;
`;

export const ScrollContainer = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1,
    },
    keyboardShouldPersistTaps: 'handled',
})`
    flex: 1;
`;

export const InnerContainer = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    margin: 8px 24px;
`;

export const ListContainer = styled.View`
    height: 300px;
    width: 100%;
`;

export const Input = styled(DefaultInput).attrs({
    numberOfLines: 1,
})`
    margin-top: 10px;
    margin-bottom: 10px;
    flex: 1;
`;

export const SubmitButton = styled(Button)`
    width: 100%;
    margin: 15px 0px;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 40,
})`
    margin-top: 40px;
`;

export const Label = styled.Text`
    font-size: 18px;
    font-family: 'Poppins-Regular';
    color: #707070;
`;

export const RowContainer = styled.View`
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const EditIcon = styled(Icon).attrs({
    name: 'pencil',
    size: 22,
    color: '#01463B',
})``;

export const PhotoIcon = styled(Icon).attrs({
    name: 'camera',
    size: 22,
    color: '#01463B',
})``;

export const IconContainer = styled(Ripple).attrs({
    rippleContainerBorderRadius: 50,
})`
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin: 0px 10px;
    padding: 10px 10px;
`;
