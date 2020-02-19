import styled from 'styled-components/native';

export const Container = styled.View`
    height: 12px;
    width: 12px;
    border-radius: 50px;
    background-color: #01463b;
    align-items: center;
    justify-content: center;
`;

export const Inner = styled.View`
    height: 10px;
    width: 10px;
    border-radius: 50px;
    background-color: ${props => (props.current ? '#01463b' : '#f1f1f1')};
`;
