import styled from 'styled-components/native';
import FAIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
    padding: 0px 100px;
`;

export const Icon = styled(FAIcon).attrs({
    name: 'arrow-expand-down',
    size: 22,
    color: '#01463B',
})``;
