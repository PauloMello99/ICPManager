import { TabBar, TabView } from 'react-native-tab-view';
import styled from 'styled-components/native';

export const TabViewContainer = styled(TabView)``;

export const TabBarContainer = styled(TabBar).attrs({
    indicatorStyle: {
        backgroundColor: '#333',
        marginVertical: 10,
        marginHorizontal: 30,
        width: 60,
    },
    labelStyle: {
        color: '#333',
        fontFamily: 'Poppins-Regular',
    },
})`
    background-color: transparent;
`;
