import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';

export const Container = styled.View`
    flex: 1;
    padding: 20px;
    background-color: #f1f1f1;
`;

export const InnerContainer = styled.View`
    flex: 1;
`;

export const InfoContainer = styled.View`
    flex-direction: row;
`;

export const DetailsContainer = styled.View`
    flex: 1;
`;

export const PictureContainer = styled.View`
    align-items: center;
`;

export const Name = styled.Text.attrs({
    numberOfLines: 2,
})`
    font-size: 16px;
    font-family: 'Poppins-Bold';
    color: #707070;
    margin: 8px 0px;
`;

export const Info = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-size: 14px;
    font-family: 'Poppins-Regular';
    color: #707070;
`;

export const Separator = styled.View`
    height: 2px;
    width: 80%;
    background: #ddd;
    align-self: center;
    margin: 10px 0px;
`;

export const EditIcon = styled(Icon).attrs({
    name: 'pencil',
    size: 24,
    color: '#01463B',
})``;

export const IconContainer = styled(Ripple).attrs({
    rippleContainerBorderRadius: 50,
})`
    flex: 0.2;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
`;
