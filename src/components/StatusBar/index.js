import React from 'react';
import { View, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector } from 'react-redux';

export default function CustomStatusBar() {
    const { statusColor, statusContent } = useSelector(state => state.ui);
    return (
        <View>
            <View
                style={{
                    height: 0,
                    width: '100%',
                    backgroundColor: statusColor,
                }}
            />
            <StatusBar barStyle={statusContent} backgroundColor={statusColor} />
        </View>
    );
}
