import React from 'react';
import translate from '~/languages';

import { Container, EmptyMessage } from './styles';

export default function AgendaEmptyData() {
    return (
        <Container>
            <EmptyMessage>{translate('calendar_empty_date')}</EmptyMessage>
        </Container>
    );
}
