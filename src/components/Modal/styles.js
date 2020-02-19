import styled from 'styled-components/native';
import Modal from 'react-native-modal';

export const BottomContainer = styled(Modal).attrs({
    useNativeDriver: true,
    backdropOpacity: 0.5,
})`
    justify-content: flex-end;
    margin: ${props => (props.default ? '0px' : ' 0 20px')};
`;

export const MiddleContainer = styled(Modal).attrs({
    useNativeDriver: true,
    backdropOpacity: 0.5,
})``;

export const ModalContainer = styled.View`
    background-color: #fff;
    ${props => props.default && 'height: 95%;'};
    max-height: ${props => props.maxHeight || '100%'};

    padding: ${props => (props.default ? '10px' : '0px')};
    padding-bottom: ${props => (props.type === 'middle' ? '20px' : '40px')};

    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-right-radius: ${props =>
        props.type === 'middle' ? '10px' : '0px'};
    border-bottom-left-radius: ${props =>
        props.type === 'middle' ? '10px' : '0px'};
`;

export const ScrollContainer = styled.ScrollView``;
