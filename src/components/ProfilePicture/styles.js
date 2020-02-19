import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
    width: ${props => (props.small ? '50px' : '100px')};
    height: ${props => (props.small ? '50px' : '100px')};
    margin: 8px 0px;
    border-radius: 50px;
`;

export const RoundImage = styled(FastImage).attrs({
    resizeMode: 'cover',
})`
    position: absolute;
    width: ${props => (props.small ? '50px' : '100px')};
    height: ${props => (props.small ? '50px' : '100px')};
    border-radius: 50px;
    background-color: #eee;
`;
