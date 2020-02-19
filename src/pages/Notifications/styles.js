import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #f1f1f1;
`;

export const Header = styled.View`
    background-color: #01463b;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    align-items: center;
    justify-content: center;
    padding: 14px 24px;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-family: 'Montserrat-Bold';
    color: #ffffff;
    text-align: center;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 'large',
})`
    margin-top: 50px;
`;
