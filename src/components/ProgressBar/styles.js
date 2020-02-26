import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #ddd;
    flex: 1;
    height: 10px;
    border-radius: 60px;
    padding: 1px;
    margin: 0px 10px;
`;

export const BackgroundContainer = styled.View`
    flex: 1;
    border-radius: 50px;
    background-color: #fff;
    flex-direction: row;
    padding: 1px;
`;

export const Progress = styled.View`
    flex: ${props => {
        if (props.progress < 0) {
            return 0;
        }
        if (props.progress > 1) {
            return 1;
        }
        return props.progress;
    }};
    border-radius: 50px;
    background-color: ${props => props.color};
`;
