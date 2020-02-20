import React, { useState } from 'react';
import PropTypes from 'prop-types';
import translate from '~/languages';

import {
    Button,
    Container,
    DeleteIcon,
    Description,
    EditIcon,
    InfoContainer,
    Title,
} from './styles';

function NotificationListElement({
    item,
    onInfoPress,
    onPosivitePress,
    onNegativePress,
}) {
    const { key, text } = item;
    const [enabled, setEnabled] = useState(true);

    const handlePositiveAction = () => {
        setEnabled(false);
        onPosivitePress(item);
    };

    const handleNegativeAction = () => {
        setEnabled(false);
        onNegativePress(item);
    };

    const handleInfoPress = () => onInfoPress(item);

    return (
        <Container>
            <InfoContainer onPress={handleInfoPress}>
                <Title>{translate(`notification_title.${key}`)}</Title>
                <Description>{`${translate(
                    `create_project_notification.${key}`
                )}${text}`}</Description>
            </InfoContainer>
            <Button onPress={enabled ? handlePositiveAction : () => {}}>
                <EditIcon />
            </Button>
            <Button onPress={enabled ? handleNegativeAction : () => {}}>
                <DeleteIcon />
            </Button>
        </Container>
    );
}

NotificationListElement.defaultProps = {
    onInfoPress: () => {},
    onPosivitePress: () => {},
    onNegativePress: () => {},
};

NotificationListElement.propTypes = {
    item: PropTypes.shape({
        key: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
    onInfoPress: PropTypes.func,
    onPosivitePress: PropTypes.func,
    onNegativePress: PropTypes.func,
};

export default React.memo(NotificationListElement);
