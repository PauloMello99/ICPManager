import React, { useState, useRef, useEffect } from 'react';
import DatePicker from '@react-native-community/datetimepicker';
import { Keyboard } from 'react-native';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import translate from '~/languages';

import InputPicker from '~/components/InputPicker';

import { Container, Input } from './styles';

const INITIAL_VALUE = {
    title: '',
    description: '',
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
};

export default function InfoForm({
    onInfoChange,
    initialValue = INITIAL_VALUE,
}) {
    const [title, setTitle] = useState(initialValue.title);
    const [description, setDescription] = useState(initialValue.description);
    const [startDate, setStartDate] = useState(initialValue.startDate);
    const [endDate, setEndDate] = useState(initialValue.endDate);

    const formattedStartDate = useRef();
    const formattedEndDate = useRef();
    const descRef = useRef();

    if (initialValue.startDate && initialValue.endDate) {
        formattedStartDate.current = format(
            new Date(startDate),
            translate('date_format')
        );
        formattedEndDate.current = format(
            new Date(endDate),
            translate('date_format')
        );
    }

    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const onTitleSubmit = () => descRef.current.focus();
    const openStartDatePicker = () => setShowStartPicker(true);
    const openEndDatePicker = () => setShowEndPicker(true);

    const onStartDateChange = (_, date) => {
        setShowStartPicker(false);
        formattedStartDate.current = format(date, translate('date_format'));
        setStartDate(date.toDateString());
    };

    const onEndDateChange = (_, date) => {
        setShowEndPicker(false);
        formattedEndDate.current = format(date, translate('date_format'));
        setEndDate(date.toDateString());
    };

    useEffect(() => {
        onInfoChange({
            title,
            description,
            startDate,
            endDate,
        });
    }, [title, description, startDate, endDate, onInfoChange]);

    return (
        <Container>
            <Input
                icon="user"
                value={title}
                onChangeText={setTitle}
                keyboardType="email-address"
                returnKeyType="next"
                blurOnSubmit={false}
                editable
                selectTextOnFocus
                onSubmitEditing={onTitleSubmit}
                placeholder={translate('create_project_title_field')}
            />
            <Input
                ref={descRef}
                icon="user"
                value={description}
                onChangeText={setDescription}
                keyboardType="email-address"
                returnKeyType="none"
                multiline
                numberOfLines={3}
                blurOnSubmit={false}
                editable
                selectTextOnFocus
                onSubmitEditing={Keyboard.dismiss}
                placeholder={translate('create_project_desc_field')}
            />
            <InputPicker
                icon="calendar"
                leftIcon="hourglass-start"
                value={formattedStartDate.current}
                enabled
                placeholder={translate('create_project_start')}
                onPress={openStartDatePicker}
            />
            <InputPicker
                icon="calendar"
                leftIcon="hourglass-end"
                value={formattedEndDate.current}
                enabled
                placeholder={translate('create_project_end')}
                onPress={openEndDatePicker}
            />
            {showStartPicker && (
                <DatePicker
                    value={new Date(startDate)}
                    onChange={onStartDateChange}
                    is24Hour
                    display="calendar"
                />
            )}
            {showEndPicker && (
                <DatePicker
                    value={new Date(endDate)}
                    onChange={onEndDateChange}
                    is24Hour
                    display="calendar"
                />
            )}
        </Container>
    );
}

InfoForm.defaultProps = {
    initialValue: INITIAL_VALUE,
};

InfoForm.propTypes = {
    onInfoChange: PropTypes.func.isRequired,
    initialValue: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
    }),
};
