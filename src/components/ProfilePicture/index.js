import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Thumbnail from '~/assets/user_thumbnail.png';

import { Container, RoundImage, Loading } from './styles';

export default function ProfilePicture({ source, small }) {
    const [loading, setLoading] = useState(true);
    const [imageSource, setImageSource] = useState(source);

    const onLoad = () => setLoading(false);
    const onError = () => {
        setImageSource(Thumbnail);
        setLoading(false);
    };

    useEffect(() => {
        if (source !== imageSource) {
            setLoading(true);
            setImageSource(source);
        }
    }, [imageSource, source]);

    return (
        <Container small={small}>
            {loading && <Loading small={small} />}
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
