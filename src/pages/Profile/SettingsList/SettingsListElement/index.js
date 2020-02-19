import React from 'react';

import { Container, Text, Icon } from './styles';

export default function SettingsListElement({ item }) {
    const { icon, text, onPress } = item;
    return (
        <Container onPress={onPress}>
            <Icon name={icon} />
            <Text>{text}</Text>
        </Container>
    );
}
