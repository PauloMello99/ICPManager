import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationService from '~/navigation/NavigationService';
import translate from '~/languages';

import { showErrorSnackbar } from '~/services/Snackbar';

import {
    Container,
    RowContainer,
    ColumnContainer,
    Title,
    IconContainer,
    Description,
} from './styles';

function AgendaItem({ item }) {
    const { title, id, status } = item;
    const [desc, setDesc] = useState();

    const onPress = () => {
        if (!id) {
            showErrorSnackbar(translate('calendar_open_project_error'));
            return;
        }
        NavigationService.navigate('Project', { id });
    };

    const Icon = () => {
        switch (status) {
            case 'PROJECT_START':
                setDesc(translate('calendar_project_start'));
                return (
                    <IconContainer color="#479487">
                        <MaterialIcon
                            name="clock-start"
                            size={24}
                            color="#fff"
                        />
                    </IconContainer>
                );
            case 'PROJECT_END':
                setDesc(translate('calendar_project_end'));
                return (
                    <IconContainer color="#943D1B">
                        <MaterialIcon name="clock-end" size={24} color="#fff" />
                    </IconContainer>
                );
            case 'PHASE_START':
                setDesc(translate('calendar_phase_start'));
                return (
                    <IconContainer color="#479487">
                        <MaterialIcon
                            name="clock-start"
                            size={24}
                            color="#fff"
                        />
                    </IconContainer>
                );
            case 'PHASE_END':
                setDesc(translate('calendar_phase_end'));
                return (
                    <IconContainer color="#943D1B">
                        <MaterialIcon name="clock-end" size={24} color="#fff" />
                    </IconContainer>
                );
            default:
                return (
                    <IconContainer color="#333">
                        <MaterialIcon name="question" size={24} color="#fff" />
                    </IconContainer>
                );
        }
    };

    return (
        <Container onPress={onPress}>
            <ColumnContainer>
                <RowContainer>
                    <ColumnContainer>
                        <Title>{title}</Title>
                        <Description>{desc}</Description>
                    </ColumnContainer>
                    <Icon />
                </RowContainer>
            </ColumnContainer>
        </Container>
    );
}

AgendaItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
};

export default React.memo(AgendaItem);
