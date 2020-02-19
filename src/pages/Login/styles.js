import styled from 'styled-components/native';
import DefaultInput from '~/components/Input';
import Button from '~/components/Button';

import logo from '~/assets/logo.png';

export const Container = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    keyboardShouldPersistTaps: 'handled',
    scrollEnabled: false,
})`
    flex: 1;
    background: #fff;
`;

export const InnerContainer = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Form = styled.View`
    align-self: stretch;
    align-items: center;
    margin: 0px 50px;
`;

export const Input = styled(DefaultInput).attrs({
    numberOfLines: 1,
})`
    margin-bottom: 10px;
`;

export const LinkButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5,
})`
    margin: 8px 0px;
`;

export const ResetPasswordText = styled.Text`
    font-size: 10px;
    font-family: 'Poppins-Regular';
    text-decoration-line: underline;

    color: #008577;
`;

export const SubmitButton = styled(Button)`
    width: 100%;
    margin: 15px 0px;
`;

export const Logo = styled.Image.attrs({ source: logo, resizeMode: 'contain' })`
    width: 150px;
    height: 150px;
`;

export const ModalInnerContainer = styled.ScrollView.attrs({
    keyboardShouldPersistTaps: 'always',
})`
    flex: 1;
    padding: 10px;
`;

export const ModalTitleText = styled.Text`
    font-size: 12px;
    font-family: 'Poppins-Regular';

    color: #707070;
`;
