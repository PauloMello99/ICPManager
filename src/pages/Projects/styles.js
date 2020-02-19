import styled from 'styled-components/native';
import ActionButton from 'react-native-action-button';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInput from '~/components/Input';

export const Container = styled.View`
    flex: 1;
    z-index: -1;
`;

export const RowContainer = styled.View`
    flex-direction: row;
`;

export const FilterContainer = styled.View`
    flex: 0.2;
    align-items: center;
    justify-content: center;
`;

export const IconContainer = styled(Ripple).attrs({
    rippleContainerBorderRadius: 50,
})`
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    height: 40px;
    width: 40px;
`;

export const FilterIcon = styled(Icon).attrs(props => {
    return {
        size: 24,
        color: '#fff',
        name: props.showAll ? 'star-o' : 'star',
    };
})``;

export const Header = styled.View`
    background-color: #01463b;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    align-items: center;
    justify-content: center;
    padding: 14px 24px;
    z-index: 1;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-family: 'Montserrat-Bold';
    color: #ffffff;
    flex: 0.9;
    text-align: center;
`;

export const Loading = styled.ActivityIndicator.attrs({
    size: 'large',
})`
    margin-top: 50px;
`;

export const Input = styled(CustomInput).attrs({
    numberOfLines: 1,
    icon: 'filter',
})`
    margin-top: 10px;
`;

export const AddButton = styled(ActionButton).attrs({
    buttonColor: 'rgba(1, 70, 59, 1)',
    offsetX: 15,
    offsetY: 15,
})``;
