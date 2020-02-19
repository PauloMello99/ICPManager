import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: ${props => (props.horizontal ? ' 110px' : '100%')};
`;

export const VerticalSeparator = styled.View`
    width: 100%;
    align-self: center;
    height: 1px;
    background-color: #ddd;
`;

export const EmptyMessage = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 16px;
    color: #bcbec0;
    text-align: center;
    align-self: center;
`;

export const HorizontalSeparator = styled.View`
    width: 1px;
    align-self: center;
    height: 60%;
    background-color: #ddd;
`;
