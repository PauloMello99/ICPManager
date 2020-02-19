import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { universities as getUniversities } from '~/services/firebase';
import translate from '~/languages';

import UniversityList from '~/components/UniversityList';

import { Container, Input, Separator, Loading } from './styles';

export default function UniversityForm({ onInfoChange, initialValue = [] }) {
    const [filterText, setFilterText] = useState();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(true);

    const [filteredUniversities, setFilteredList] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [selectedUniversities, setSelected] = useState([]);

    const handleRemoveItem = item => {
        const index = selectedUniversities.findIndex(un => un.id === item.id);
        const list = [...selectedUniversities];
        list.splice(index, 1);
        setSelected(list);
        onInfoChange(list);
    };

    const handleSelectItem = item => {
        if (selectedUniversities.find(un => item.id === un.id)) {
            handleRemoveItem(item);
            return;
        }
        setSelected(selectedUniversities.concat(item));
        onInfoChange(selectedUniversities.concat(item));
    };

    const loadUniversities = useCallback(async () => {
        setRefreshing(true);
        const response = await getUniversities();
        const list = Object.values(response.val() || []);
        const enabled = list.filter(uni => uni.enable);
        setUniversities(enabled);

        if (initialValue) {
            const initialList = list.filter(un =>
                initialValue.find(init => init === un.id)
            );
            setSelected(initialList);
        }

        setLoading(false);
        setRefreshing(false);
    }, []);

    const resetFilter = () => {
        setFilterText();
        setFilteredList([]);
    };

    const filter = txt => {
        setFilterText(txt);
        const filtered = universities.filter(project => {
            const { name, state, country } = project;
            const lowerQuery = txt.toLocaleLowerCase();
            const lowerName = name.toLocaleLowerCase();
            const lowerState = state.toLocaleLowerCase();
            const lowerCountry = country.toLocaleLowerCase();
            return (
                lowerName.includes(lowerQuery) ||
                lowerState.includes(lowerQuery) ||
                lowerCountry.includes(lowerQuery)
            );
        });
        setFilteredList(filtered);
    };

    useEffect(() => {
        loadUniversities();
    }, [loadUniversities]);

    return (
        <Container>
            <UniversityList
                list={selectedUniversities}
                onPress={handleRemoveItem}
                horizontal
            />
            <Separator />
            <Input
                buttonTitle={filterText && translate('clear')}
                onButtonPress={resetFilter}
                icon="university"
                value={filterText}
                onChangeText={filter}
                keyboardType="email-address"
                autoCorrect={false}
                returnKeyType="next"
                blurOnSubmit={false}
                editable={!loading}
                selectTextOnFocus={!loading}
                placeholder={translate('search')}
            />
            {loading ? (
                <Loading />
            ) : (
                <UniversityList
                    list={filterText ? filteredUniversities : universities}
                    refreshing={refreshing}
                    onRefresh={loadUniversities}
                    onPress={handleSelectItem}
                />
            )}
        </Container>
    );
}

UniversityForm.defaultProps = {
    initialValue: [],
};

UniversityForm.propTypes = {
    initialValue: PropTypes.arrayOf(PropTypes.string.isRequired),
    onInfoChange: PropTypes.func.isRequired,
};
