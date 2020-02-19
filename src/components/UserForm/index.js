import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import {
    students as getStudents,
    professors as getProfessors,
} from '~/services/firebase';
import translate from '~/languages';

import UserList from '~/components/UserList';

import { Container, Input, Separator, Loading } from './styles';

export default function UserForm({
    onInfoChange,
    userType,
    universities,
    initialValue = [],
}) {
    const uid = useSelector(state => state.auth.uid);
    const [filterText, setFilterText] = useState();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(true);

    const [filteredUsers, setFilteredList] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelected] = useState([]);

    const handleRemoveItem = item => {
        const index = selectedUsers.findIndex(un => un.id === item.id);
        const list = [...selectedUsers];
        list.splice(index, 1);
        setSelected(list);
        onInfoChange(list);
    };

    const handleSelectItem = item => {
        if (selectedUsers.find(un => item.id === un.id)) {
            handleRemoveItem(item);
            return;
        }
        const list = selectedUsers.concat(item);
        setSelected(list);
        onInfoChange(list);
    };

    const loadUsers = useCallback(async () => {
        setRefreshing(true);
        let response;
        switch (userType) {
            case 'student':
                response = await getStudents();
                break;
            case 'professor':
                response = await getProfessors();
                break;
            default:
        }
        const list = Object.values(response.val() || []);

        // Somente usuários habilitados e que estejam numa universidade anteriormente selecionada
        const available = list.filter(user => {
            if (user.id === uid) {
                return false;
            }
            if (user.enable && user.universityList) {
                const hasUniversity = universities.find(selectedUniversity =>
                    user.universityList.find(
                        userUniversity => userUniversity === selectedUniversity
                    )
                );
                return hasUniversity;
            }
            return false;
        });

        // Atualizando lista de selecionados
        const filterSelected = selectedUsers.filter(user => {
            if (user.enable && user.universityList) {
                const hasUniversity = universities.find(selectedUniversity =>
                    user.universityList.find(
                        userUniversity => userUniversity === selectedUniversity
                    )
                );
                return hasUniversity;
            }
            return false;
        });
        setSelected(filterSelected);
        onInfoChange(filterSelected);

        if (initialValue) {
            const initialList = list.filter(usr =>
                initialValue.find(init => {
                    if (init === uid) {
                        return false;
                    }
                    return init === usr.id;
                })
            );
            setSelected(initialList);
        }

        setUsers(available);
        setLoading(false);
        setRefreshing(false);
    }, [universities]);

    const resetFilter = () => {
        setFilterText();
        setFilteredList([]);
    };

    const filter = txt => {
        setFilterText(txt);
        const filtered = users.filter(user => {
            const { email, name } = user;
            const lowerQuery = txt.toLocaleLowerCase();
            const lowerEmail = email.toLocaleLowerCase();
            const lowerName = name.toLocaleLowerCase();
            return (
                lowerEmail.includes(lowerQuery) ||
                lowerName.includes(lowerQuery)
            );
        });
        setFilteredList(filtered);
    };

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    return (
        <Container>
            <UserList
                userType={userType}
                list={selectedUsers}
                onPress={handleRemoveItem}
                horizontal
            />
            <Separator />
            <Input
                buttonTitle={filterText && translate('clear')}
                onButtonPress={resetFilter}
                icon="user"
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
                <UserList
                    userType={userType}
                    list={filterText ? filteredUsers : users}
                    refreshing={refreshing}
                    onRefresh={loadUsers}
                    onPress={handleSelectItem}
                />
            )}
        </Container>
    );
}

UserForm.defaultProps = {
    initialValue: [],
};

UserForm.propTypes = {
    initialValue: PropTypes.arrayOf(PropTypes.string.isRequired),
    universities: PropTypes.arrayOf(PropTypes.string).isRequired,
    onInfoChange: PropTypes.func.isRequired,
    userType: PropTypes.string.isRequired,
};
