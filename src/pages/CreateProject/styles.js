import styled from 'styled-components/native';
import ViewPager from '@react-native-community/viewpager';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';
import DefaultButton from '~/components/Button';

export const Container = styled.View`
    flex: 1;
`;

export const DotContainer = styled.View`
    flex: 0.6;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
`;

export const ControlContainer = styled.View`
    flex: 0.2;
    align-items: center;
    justify-content: center;
`;

export const Pager = styled(ViewPager).attrs({
    initialPage: 0,
    scrollEnabled: false,
    pageMargin: 15,
    keyboardDismissMode: 'on-drag',
})`
    flex: 0.9;
`;

export const Button = styled(Ripple).attrs({
    rippleContainerBorderRadius: 50,
})`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const PreviousIcon = styled(Icon).attrs({
    name: 'arrow-left-bold',
    size: 30,
    color: '#01463B',
})``;

export const NextIcon = styled(Icon).attrs({
    name: 'arrow-right-bold',
    size: 30,
    color: '#01463B',
})``;

export const ConfirmIcon = styled(Icon).attrs({
    name: 'check-bold',
    size: 30,
    color: '#01463B',
})``;

export const PagerControl = styled.View`
    flex: 0.1;
    flex-direction: row;
`;

export const SavingModal = styled(Modal).attrs({
    useNativeDriver: true,
    backdropOpacity: 0.5,
})``;

export const SavingModalContainer = styled.ScrollView`
    background-color: #fff;
    border-radius: 16px;
    padding: 30px 20px 0px 20px;
`;

export const SavingIndicator = styled.ActivityIndicator.attrs({
    size: 40,
})``;

export const FeedbackContainer = styled.View`
    align-items: center;
`;

export const Feedback = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 16px;
    color: #6d6e71;
`;

export const FeedbackButton = styled(DefaultButton)`
    width: 70%;
    margin-top: 30px;
`;
