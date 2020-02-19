import styled from 'styled-components/native';
import DefaultInput from '~/components/Input';
import Button from '~/components/Button';

export const ModalContainer = styled.View`
    flex: 1;
    padding: 10px 20px;
`;

export const Input = styled(DefaultInput).attrs({
    numberOfLines: 1,
})`
    margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
    width: 100%;
    margin: 15px 0px;
`;
