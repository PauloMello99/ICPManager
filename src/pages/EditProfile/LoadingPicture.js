import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { View } from 'react-native';

export default function LoadingPicture() {
    return (
        <View style={{ marginVertical: 8 }}>
            <SkeletonPlaceholder>
                <View
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                    }}
                />
            </SkeletonPlaceholder>
        </View>
    );
}
