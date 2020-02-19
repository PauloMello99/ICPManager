import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SplashScreen from '~/pages/SplashScreen';
import Register from '~/pages/Register';
import Login from '~/pages/Login';

import Project from '~/pages/Project';
import Projects from '~/pages/Projects';
import CreateProject from '~/pages/CreateProject';

import Search from '~/pages/Search';
import Calendar from '~/pages/Calendar';
import Notifications from '~/pages/Notifications';

import CreateUniversity from '~/pages/CreateUniversity';
import Profile from '~/pages/Profile';
import EditProfile from '~/pages/EditProfile';
import Student from '~/pages/Student';
import Professor from '~/pages/Professor';

const LoginStack = createStackNavigator(
    {
        Login,
        Register,
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions: { headerShown: false },
    }
);

const StartStack = createSwitchNavigator(
    {
        SplashScreen,
        LoginStack,
    },
    {
        initialRouteName: 'SplashScreen',
        defaultNavigationOptions: { headerShown: false },
    }
);

const ProjectListStack = createStackNavigator(
    {
        Projects,
    },
    {
        initialRouteName: 'Projects',
        defaultNavigationOptions: { headerShown: false },
        navigationOptions: {
            tabBarIcon: state => (
                <Icon
                    style={{ backgroundColor: 'transparent' }}
                    name="book-outline"
                    color={state.focused ? '#01463B' : '#999'}
                    size={26}
                />
            ),
        },
    }
);

const SearchStack = createStackNavigator(
    {
        Search,
    },
    {
        initialRouteName: 'Search',
        defaultNavigationOptions: { headerShown: false },
        navigationOptions: {
            tabBarIcon: state => (
                <Icon
                    style={{ backgroundColor: 'transparent' }}
                    name="account-search"
                    color={state.focused ? '#01463B' : '#999'}
                    size={26}
                />
            ),
        },
    }
);

const CalendarStack = createStackNavigator(
    {
        Calendar,
    },
    {
        initialRouteName: 'Calendar',
        defaultNavigationOptions: { headerShown: false },
        navigationOptions: {
            tabBarIcon: state => (
                <Icon
                    style={{ backgroundColor: 'transparent' }}
                    name="calendar-multiselect"
                    color={state.focused ? '#01463B' : '#999'}
                    size={26}
                />
            ),
        },
    }
);

const ProfileStack = createStackNavigator(
    {
        Profile,
    },
    {
        initialRouteName: 'Profile',
        defaultNavigationOptions: { headerShown: false },
        navigationOptions: {
            tabBarIcon: state => (
                <Icon
                    style={{ backgroundColor: 'transparent' }}
                    name="settings-outline"
                    color={state.focused ? '#01463B' : '#999'}
                    size={26}
                />
            ),
        },
    }
);

const NotificationStack = createStackNavigator(
    {
        Notifications,
    },
    {
        initialRouteName: 'Notifications',
        defaultNavigationOptions: { headerShown: false },
        navigationOptions: {
            tabBarIcon: state => (
                <Icon
                    style={{ backgroundColor: 'transparent' }}
                    name="message-text-outline"
                    color={state.focused ? '#01463B' : '#999'}
                    size={26}
                />
            ),
            // tabBarBadge: notifications.length,
        },
    }
);

const DashboardStack = createMaterialBottomTabNavigator(
    {
        ProjectListStack,
        SearchStack,
        CalendarStack,
        NotificationStack,
        ProfileStack,
    },
    {
        initialRouteName: 'ProjectListStack',
        labeled: false,
        barStyle: { backgroundColor: '#fff' },
        sceneAnimationEnabled: true,
        activeColor: '#01463B',
        backBehavior: 'none',
    }
);

const RootStack = createStackNavigator(
    {
        DashboardStack,
        EditProfile,
        Student,
        Professor,
        Project,
        CreateProject,
        CreateUniversity,
    },
    {
        initialRouteName: 'DashboardStack',
        defaultNavigationOptions: {
            headerShown: false,
            animationEnabled: true,
        },
    }
);

const AppNavigator = createSwitchNavigator(
    {
        StartStack,
        RootStack,
    },
    {
        initialRouteName: 'StartStack',
        defaultNavigationOptions: { headerShown: false },
    }
);

export default AppNavigator;
