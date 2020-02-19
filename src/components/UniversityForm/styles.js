import styled from 'styled-components/native';
import DefaultInput from '~/components/Input';

export const Container = styled.View`
    flex: 1;
    margin: 0px 10px;
`;

export const Input = styled(DefaultInput).attrs({
    numberOfLines: 1,
})`
    margin-bottom: 15px;
`;

export const Separator = styled.View`
    width: 100%;
    align-self: center;
    height: 1px;
    background-color: #707070;
    margin: 10px 0px 20px 0px;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 40,
})`
    align-self: center;
    margin-top: 40px;
`;
