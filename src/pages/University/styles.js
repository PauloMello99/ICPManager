import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
    flex: 1;
    background: #f1f1f1;
`;

export const Label = styled.Text`
    font-size: 12px;
    font-family: 'Poppins-Regular';
    color: #707070;
`;

export const Info = styled.Text.attrs({
    numberOfLines: 2,
})`
    font-size: 16px;
    font-family: 'Poppins-Bold';
    color: #707070;
    margin-bottom: 8px;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 40,
})`
    margin-top: 40px;
`;

export const HeaderContainer = styled.View`
    background: #ddd;
`;

export const Header = styled.View`
    background-color: #01463b;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`;

export const TextContainer = styled.View`
    padding: 0px 24px;
`;

export const InnerContainer = styled.ScrollView`
    flex: 1;
`;

export const UniversityPicture = styled(FastImage).attrs({
    resizeMode: 'cover',
})`
    width: 100%;
    height: ${`${Dimensions.get('window').height * 0.3}px`};
    background: #ddd;
    margin-bottom: 20px;
`;
