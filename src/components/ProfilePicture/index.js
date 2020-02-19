import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Thumbnail from '~/assets/user_thumbnail.png';

import { Container, RoundImage } from './styles';

export default function ProfilePicture({ source, small }) {
    const [loading, setLoading] = useState(true);
    const [imageSource, setImageSource] = useState(source);

    const onLoad = () => setLoading(false);
    const onError = () => setImageSource(Thumbnail);

    useEffect(() => {
        if (source !== imageSource) {
            setLoading(true);
            setImageSource(source);
        }
    }, [imageSource, source]);

    return (
        <Container small={small}>
            {loading && (
                <SkeletonPlaceholder>
                    <View
                        style={{
                            width: small ? 50 : 100,
                            height: small ? 50 : 100,
                            borderRadius: 50,
                        }}
                    />
                </SkeletonPlaceholder>
            )}
            <RoundImage
                source={source ? { uri: imageSource } : Thumbnail}
                onLoad={onLoad}
                onError={onError}
                small={small}
            />
        </Container>
    );
}

ProfilePicture.defaultProps = {
    small: false,
    source: null,
};

ProfilePicture.propTypes = {
    source: PropTypes.string,
    small: PropTypes.bool,
};
