import { TabBar, TabView } from 'react-native-tab-view';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const TabViewContainer = styled(TabView)``;

export const TabBarContainer = styled(TabBar).attrs(props => {
    return {
        indicatorStyle: {
            backgroundColor: '#333',
            marginVertical: 10,
            marginHorizontal:
                Dimensions.get('window').width / (props.tabCount * 4),
            width: Dimensions.get('window').width / (props.tabCount * 2),
        },
        labelStyle: {
            color: '#333',
            fontFamily: 'Poppins-Regular',
        },
    };
})`
    background-color: transparent;
`;
