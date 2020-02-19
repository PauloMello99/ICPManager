import React from 'react';
import PropTypes from 'prop-types';

import { TabViewContainer, TabBarContainer } from './styles';

export default function TabView({
    navigationState,
    renderScene,
    onIndexChange,
    swipeEnabled,
}) {
    return (
        <TabViewContainer
            renderTabBar={props => <TabBarContainer {...props} />}
            navigationState={navigationState}
            renderScene={renderScene}
            onIndexChange={onIndexChange}
            swipeEnabled={swipeEnabled}
        />
    );
}

TabView.defaultProps = {
    swipeEnabled: true,
};

TabView.propTypes = {
    navigationState: PropTypes.shape({
        index: PropTypes.number.isRequired,
        routes: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                title: PropTypes.string.isRequired,
            })
        ),
    }).isRequired,
    renderScene: PropTypes.func.isRequired,
    onIndexChange: PropTypes.func.isRequired,
    swipeEnabled: PropTypes.bool,
};
