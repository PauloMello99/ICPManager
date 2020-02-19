import styled from 'styled-components/native';
import DefaultInput from '~/components/Input';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 20px 30px;
`;

export const Input = styled(DefaultInput).attrs({
    numberOfLines: 1,
})`
    margin-bottom: 15px;
`;
