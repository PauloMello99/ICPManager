import styled from 'styled-components/native';
import DefaultInput from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1,
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
    margin: 0px 24px;
`;

export const Input = styled(DefaultInput).attrs({
    numberOfLines: 1,
})`
    margin-bottom: 15px;
`;

export const SubmitButton = styled(Button)`
    width: 100%;
    margin: 30px 0px;
`;
