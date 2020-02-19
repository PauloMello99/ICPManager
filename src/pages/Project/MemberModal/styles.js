import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';
import ViewPager from '@react-native-community/viewpager';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ModalContainer = styled.View`
    flex: 1;
`;

export const RowContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0px 5px;
`;

export const ModalBackButton = styled(Ripple).attrs({
    rippleContainerBorderRadius: 50,
})`
    align-self: flex-end;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
`;

export const ModalBackIcon = styled(Icon).attrs({
    name: 'close',
    size: 30,
    color: '#cc6060',
})``;

export const ModalConfirmIcon = styled(Icon).attrs({
    name: 'check',
    size: 30,
    color: '#309500',
})``;

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

export const Pager = styled(ViewPager).attrs({
    initialPage: 0,
    scrollEnabled: false,
    pageMargin: 15,
    keyboardDismissMode: 'on-drag',
})`
    flex: 0.9;
`;

export const PagerControl = styled.View`
    flex: 0.1;
    flex-direction: row;
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

export const Button = styled(Ripple).attrs({
    rippleContainerBorderRadius: 50,
})`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;
