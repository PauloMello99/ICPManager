import React, { useCallback, useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useFocusEffect } from 'react-navigation-hooks';
import { useDispatch } from 'react-redux';
import translate from '~/languages';
import { professors, students, universities } from '~/services/firebase';

import { changeStatusBarColor } from '~/store/modules/ui/actions';
import NavigationService from '~/navigation/NavigationService';

import Picker from '~/components/Picker';
import UniversityList from '~/components/UniversityList';
import UserList from '~/components/UserList';

import { Container, Header, Title, Input, Loading, AddButton } from './styles';

export default function Search() {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState();
    const [filterText, setFilterText] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const [universityList, setUniversityList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [professorList, setProfessorList] = useState([]);
    const [currentList, setCurrentList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    const filter = useCallback(
        text => {
            setFilterText(text);
            if (selected === 'universities') {
                const filtered = universityList.filter(project => {
                    const { name, state, country } = project;
                    const lowerQuery = text.toLocaleLowerCase();
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
                return;
            }
            const current =
                selected === 'students' ? studentList : professorList;
            const filtered = current.filter(user => {
                const { email, name } = user;
                const lowerQuery = text.toLocaleLowerCase();
                const lowerEmail = email.toLocaleLowerCase();
                const lowerName = name.toLocaleLowerCase();
                return (
                    lowerEmail.includes(lowerQuery) ||
                    lowerName.includes(lowerQuery)
                );
            });
            setFilteredList(filtered);
        },
        [professorList, selected, studentList, universityList]
    );

    const onPickerChange = val => setSelected(val);
    const clearFilterText = () => setFilterText('');
    const onFilterTextChange = txt => filter(txt);

    const selections = [
        { value: 'students', label: translate('students') },
        { value: 'professors', label: translate('professors') },
        { value: 'universities', label: translate('universities') },
    ];

    const loadProfessors = async () => {
        setRefreshing(true);
        const response = await professors();
        const list = Object.values(response.val() || []);
        const enabled = list.filter(prof => prof.enable);
        setProfessorList(enabled);
        setRefreshing(false);
        setLoading(false);
    };

    const loadStudents = async () => {
        setRefreshing(true);
        const response = await students();
        const list = Object.values(response.val() || []);
        const enabled = list.filter(std => std.enable);
        setStudentList(enabled);
        setRefreshing(false);
        setLoading(false);
    };

    const loadUniversities = async () => {
        setRefreshing(true);
        const response = await universities();
        const list = Object.values(response.val() || []);
        const enabled = list.filter(uni => uni.enable);
        setUniversityList(enabled);
        setRefreshing(false);
        setLoading(false);
    };

    const onAddUniversity = () =>
        NavigationService.navigate('CreateUniversity');

    const goToUniversity = ({ id }) =>
        NavigationService.navigate('University', { id });

    const List = useCallback(() => {
        if (!selected) {
            return null;
        }
        if (refreshing) {
            setRefreshing(false);
        }
        switch (selected) {
            case 'universities':
                return (
                    <UniversityList
                        list={currentList}
                        refreshing={refreshing}
                        onRefresh={loadUniversities}
                        onPress={goToUniversity}
                    />
                );
            case 'professors':
                return (
                    <UserList
                        userType="professor"
                        list={currentList}
                        refreshing={refreshing}
                        onRefresh={loadProfessors}
                        goToProfile
                    />
                );
            case 'students':
                return (
                    <UserList
                        userType="student"
                        list={currentList}
                        refreshing={refreshing}
                        onRefresh={loadStudents}
                        goToProfile
                    />
                );
            default:
                return null;
        }
    }, [currentList, refreshing, selected]);

    useEffect(() => {
        setLoading(true);
        setFilterText();
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [selected]);

    useEffect(() => {
        loadProfessors();
        loadStudents();
        loadUniversities();
    }, []);

    useEffect(() => {
        if (filterText) {
            setCurrentList(filteredList);
            return;
        }
        switch (selected) {
            case 'students':
                setCurrentList(studentList);
                break;
            case 'professors':
                setCurrentList(professorList);
                break;
            case 'universities':
                setCurrentList(universityList);
                break;
            default:
        }
    }, [
        filterText,
        filteredList,
        professorList,
        selected,
        studentList,
        universityList,
    ]);

    useFocusEffect(
        useCallback(() => {
            dispatch(changeStatusBarColor('#01463B', 'light-content'));
        }, [dispatch])
    );

    return (
        <Container>
            <Header>
                <Title>{translate('search')}</Title>
                <Picker
                    value={selected}
                    items={selections}
                    onValueChange={onPickerChange}
                    icon="user"
                    placeholder={translate('search_select_category')}
                    dark
                />
                <Input
                    buttonTitle={filterText && 'limpar'}
                    onSubmitEditing={Keyboard.dismiss}
                    onButtonPress={clearFilterText}
                    onChangeText={onFilterTextChange}
                    selectTextOnFocus={!loading}
                    placeholder={translate('search')}
                    returnKeyType="send"
                    editable={!loading}
                    value={filterText}
                    dark
                />
            </Header>
            {loading ? <Loading /> : <List />}
            {!loading && selected === 'universities' && (
                <AddButton onPress={onAddUniversity} />
            )}
        </Container>
    );
}
