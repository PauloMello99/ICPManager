import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import background from '~/assets/student_background.jpg';

export const Container = styled.View`
    flex: 1;
`;

export const InfoContainer = styled.View`
    margin-top: 40%;
    width: 100%;
    height: 100%;
`;

export const ListContainer = styled.View`
    height: 400px;
`;

export const TextContainer = styled.View`
    padding: 0px 24px;
`;

export const InnerContainer = styled.ScrollView`
    flex: 1;
`;

export const Background = styled.Image.attrs({
    source: background,
    resizeMode: 'cover',
})`
    height: 20%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`;

export const ProfilePicture = styled(FastImage)`
    background-color: #eee;
    height: 120px;
    width: 120px;
    position: absolute;
    z-index: 2;
    top: 11%;
    border-radius: 60px;
    align-self: center;
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

export const Separator = styled.View`
    height: 2px;
    width: 80%;
    background: #ddd;
    align-self: center;
    margin: 10px 0px;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 40,
})`
    margin-top: 40px;
`;
