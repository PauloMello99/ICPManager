import React, { useState, useEffect, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from 'react-navigation-hooks';

import translate from '~/languages';
import { projects as getProjects } from '~/services/firebase';
import NavigationService from '~/navigation/NavigationService';
import { changeStatusBarColor } from '~/store/modules/ui/actions';

import ProjectList from '~/components/ProjectList';

import {
    Container,
    Header,
    Title,
    Loading,
    RowContainer,
    FilterContainer,
    FilterIcon,
    IconContainer,
    Input,
    AddButton,
} from './styles';

export default function Projects() {
    const { uid, type } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [showAll, setShowAll] = useState(type === 'coordinator');
    const [loading, setLoading] = useState(true);

    const [filteredProjects, setFilteredProjects] = useState([]);
    const [myProjects, setMyProjects] = useState([]);
    const [projects, setProjects] = useState([]);
    const [currentList, setCurrentList] = useState([]);

    const onPress = id => NavigationService.navigate('Project', { id });
    const onAddProject = () => NavigationService.navigate('CreateProject');

    const resetFilter = () => {
        setFilterText();
        setFilteredProjects([]);
    };
    const onSwitch = () => {
        setShowAll(!showAll);
        resetFilter();
    };

    const filter = text => {
        setFilterText(text);
        const current = showAll ? projects : myProjects;
        const filtered = current.filter(project => {
            const { description, title } = project;
            const lowerQuery = text.toLocaleLowerCase();
            const lowerDesc = description.toLocaleLowerCase();
            const lowerTitle = title.toLocaleLowerCase();
            return (
                lowerDesc.includes(lowerQuery) ||
                lowerTitle.includes(lowerQuery)
            );
        });
        setFilteredProjects(filtered);
    };

    const onFilterTextChange = txt => filter(txt);

    const loadProjects = useCallback(async () => {
        setRefreshing(true);
        resetFilter();
        const response = await getProjects();
        const list = Object.values(response.val() || []);

        if (type === 'coordinator') {
            setProjects(list);
            setLoading(false);
            setRefreshing(false);
            return;
        }
        const myProj = list.filter(proj => {
            if (!proj.enable) {
                return false;
            }
            switch (type) {
                case 'student':
                    return proj.students && proj.students.includes(uid);
                case 'professor':
                    return proj.professors && proj.professors.includes(uid);
                default:
                    return false;
            }
        });

        setMyProjects(myProj);
        setProjects(list);
        setLoading(false);
        setRefreshing(false);
    }, [type, uid]);

    useEffect(() => {
        loadProjects();
    }, [loadProjects, type, uid]);

    // MyProjects || Projects || Filtered Projects
    useEffect(() => {
        const setList = () => {
            if (filterText) {
                setCurrentList(filteredProjects);
                return;
            }
            if (showAll) {
                setCurrentList(projects);
                return;
            }
            setCurrentList(myProjects);
        };
        setList();
    }, [filterText, filteredProjects, myProjects, projects, showAll]);

    useFocusEffect(
        useCallback(() => {
            dispatch(changeStatusBarColor('#01463B', 'light-content'));
        }, [dispatch])
    );

    return (
        <Container>
            <Header>
                <RowContainer>
                    <Title>
                        {showAll
                            ? translate('projects_projects')
                            : translate('projects_my_projects')}
                    </Title>
                    {type !== 'coordinator' && (
                        <FilterContainer>
                            <IconContainer onPress={onSwitch}>
                                <FilterIcon showAll={showAll} />
                            </IconContainer>
                        </FilterContainer>
                    )}
                </RowContainer>
                <Input
                    buttonTitle={filterText && translate('clear')}
                    onSubmitEditing={Keyboard.dismiss}
                    onButtonPress={resetFilter}
                    onChangeText={onFilterTextChange}
                    selectTextOnFocus={!loading}
                    placeholder={translate('search')}
                    returnKeyType="send"
                    editable={!loading}
                    value={filterText}
                    dark
                />
            </Header>
            {!loading ? (
                <ProjectList
                    list={currentList}
                    onRefresh={loadProjects}
                    refreshing={refreshing}
                    onPress={onPress}
                />
            ) : (
                <Loading />
            )}
            {type !== 'student' && <AddButton onPress={onAddProject} />}
        </Container>
    );
}
