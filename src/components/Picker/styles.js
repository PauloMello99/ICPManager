import styled from 'styled-components/native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;

    border-bottom-width: 1px;
    border-bottom-color: ${props => (props.dark ? '#fff' : ' #6d6e71')};
`;

export const StyledPicker = styled.Picker.attrs({
    mode: 'dialog',
    itemStyle: {
        fontFamily: 'Poppins-Regular',
    },
})`
    flex: 1;
    color: #707070;
    font-size: 16px;
    font-family: 'Poppins-Regular';
`;

export const Icon = styled(FAIcon).attrs(props => {
    return {
        size: 12,
        color: props.dark ? '#fff' : '#BCBEC0',
        solid: true,
    };
})`
    margin-right: 5px;
    margin-bottom: 5px;
`;

export const ChevronIcon = styled(FAIcon).attrs(props => {
    return {
        size: 24,
        color: props.dark ? '#fff' : '#BCBEC0',
        solid: true,
        name: 'sort-down',
    };
})``;
