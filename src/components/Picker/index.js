import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Dimensions } from 'react-native';
import PickerSelect from 'react-native-picker-select';

import { Container, ChevronIcon, Icon } from './styles';

const pickerWitdh = Dimensions.get('screen').width * 0.8;

export default function Picker({
    items,
    onValueChange,
    value,
    enabled,
    placeholder,
    icon,
    dark,
}) {
    const chevron = () => <ChevronIcon dark={dark} />;
    return (
        <Container dark={dark}>
            {icon && <Icon name={icon} dark={dark} />}
            <PickerSelect
                disabled={!enabled}
                value={value}
                style={{
                    inputAndroid: {
                        color: dark ? '#fff' : '#333',
                        width: pickerWitdh,
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,
                        padding: 2,
                    },
                    inputIOS: {
                        color: dark ? '#fff' : '#333',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,
                        padding: 5,
                    },
                    iconContainer: {
                        bottom: Platform.OS === 'ios' ? 0 : 8,
                    },
                }}
                Icon={chevron}
                useNativeAndroidPickerStyle={false}
                onValueChange={onValueChange}
                items={items}
                placeholder={{
                    label: placeholder || 'Choose...',
                    color: '#bcbec0',
                }}
            />
        </Container>
    );
}

Picker.defaultProps = {
    onValueChange: null,
    value: null,
    enabled: true,
    placeholder: null,
    icon: null,
    dark: false,
};

Picker.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    onValueChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    enabled: PropTypes.bool,
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    dark: PropTypes.bool,
};
