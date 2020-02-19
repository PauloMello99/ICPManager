import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from 'react-navigation-hooks';
import translate from '~/languages';

import { loadProjectsRequest } from '~/store/modules/calendar/actions';
import { changeStatusBarColor } from '~/store/modules/ui/actions';

import { Agenda } from '~/components/Calendar';
import AgendaEmptyData from './AgendaEmptyData';
import AgendaEmptyDate from './AgendaEmptyDate';
import AgendaKnob from './AgendaKnob';
import AgendaItem from './AgendaItem';

import { Container, Loading, Header, Title } from './styles';

const theme = {
    todayTextColor: '#943D1B',
    selectedDayBackgroundColor: '#008577',
    textDayFontSize: 14,
    textMonthFontSize: 14,
    textDayHeaderFontSize: 10,
    agendaTodayColor: '#01463B',
};

export default function Calendar() {
    const dispatch = useDispatch();
    const { loading, dots, items } = useSelector(state => state.calendar);

    const agendaRenderItem = item => <AgendaItem item={item} />;
    const agendaRowChanged = (r1, r2) => r1.text !== r2.text;
    const onRefresh = useCallback(() => dispatch(loadProjectsRequest()), [
        dispatch,
    ]);

    useEffect(() => {
        onRefresh();
    }, [onRefresh]);

    useFocusEffect(
        useCallback(() => {
            dispatch(changeStatusBarColor('#01463B', 'light-content'));
        }, [dispatch])
    );

    return (
        <Container>
            <Header>
                <Title>{translate('calendar')}</Title>
            </Header>
            {!loading ? (
                <Agenda
                    markingType="multi-dot"
                    markedDates={dots}
                    items={items}
                    renderEmptyData={AgendaEmptyData}
                    renderEmptyDate={AgendaEmptyDate}
                    renderItem={agendaRenderItem}
                    renderKnob={AgendaKnob}
                    futureScrollRange={20}
                    pastScrollRange={20}
                    refreshing={loading}
                    rowHasChanged={agendaRowChanged}
                    onRefresh={onRefresh}
                    theme={theme}
                />
            ) : (
                <Loading />
            )}
        </Container>
    );
}
