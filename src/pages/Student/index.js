import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFocusEffect } from 'react-navigation-hooks';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import translate from '~/languages';

import TabView from './TabView';
import AppBar from '~/components/Appbar';
import ProjectList from '~/components/ProjectList';
import UniversityList from '~/components/UniversityList';

import { changeStatusBarColor } from '~/store/modules/ui/actions';
import { showErrorSnackbar } from '~/services/Snackbar';

import {
    studentRT,
    universities as getUniversities,
    projects as getProjects,
} from '~/services/firebase';

import {
    Container,
    Background,
    ProfilePicture,
    InnerContainer,
    InfoContainer,
    ListContainer,
    Label,
    Info,
    Separator,
    Loading,
    TextContainer,
} from './styles';

export default function Student({ navigation }) {
    const id = navigation.getParam('id');
    const dispatch = useDispatch();
    const [universities, setUniversities] = useState([]);
    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState({ picture: -1 });
    const [loading, setLoading] = useState(true);
    const [tabState, setTabState] = useState({
        index: 0,
        routes: [
            { key: 'first', title: translate('instituitions') },
            { key: 'second', title: translate('projects_projects') },
        ],
    });

    const projectsContainer = <ProjectList list={projects} />;
    const universitiesContainer = <UniversityList list={universities} />;

    const onTabChange = useCallback(
        index => setTabState(state => ({ ...state, index })),
        []
    );

    const renderScene = useCallback(
        ({ route }) => {
            switch (route.key) {
                case 'first':
                    return universitiesContainer;
                case 'second':
                    return projectsContainer;
                default:
                    return null;
            }
        },
        [projectsContainer, universitiesContainer]
    );

    const onBackPress = () => navigation.goBack();

    useEffect(() => {
        const loadStudent = async () =>
            studentRT(id, async snapshot => {
                const res = snapshot.val();
                if (!res.facebook) {
                    res.facebook = translate('profile_no_info');
                }
                if (!res.skype) {
                    res.skype = translate('profile_no_info');
                }
                if (!res.gender) {
                    res.gender = translate('profile_no_info');
                }
                if (!res.birthDate) {
                    res.birthDate = translate('profile_no_info');
                } else {
                    const date = new Date(res.birthDate);
                    res.birthDate = format(date, translate('date_format'));
                }

                if (res.universityList) {
                    const response = await getUniversities();
                    const list = Object.values(response.val() || []);
                    const myList = list.filter(uni =>
                        res.universityList.includes(uni.id)
                    );
                    setUniversities(myList);
                }
                const response = await getProjects();
                const list = Object.values(response.val() || []);
                const myList = list.filter(
                    proj => proj.students && proj.students.includes(id)
                );
                setProjects(myList);
                setProfile(res);
                setLoading(false);
            });
        if (!id) {
            showErrorSnackbar(translate('login_user_info_failure'));
            navigation.goBack();
        }
        loadStudent();
    }, [id, navigation]);

    useFocusEffect(
        useCallback(() => {
            dispatch(changeStatusBarColor('#871209', 'light-content'));
        }, [dispatch])
    );

    return (
        <Container>
            <AppBar
                onBackPress={onBackPress}
                title={translate('student')}
                dark
            />
            <Background />
            {profile.picture !== -1 && (
                <ProfilePicture source={{ uri: profile.picture }} />
            )}
            <InfoContainer>
                {loading ? (
                    <Loading />
                ) : (
                    <InnerContainer>
                        <TextContainer>
                            <Label>{translate('register_name')}</Label>
                            <Info>{profile.name}</Info>
                            <Label>{translate('email')}</Label>
                            <Info>{profile.email}</Info>
                            <Label>Facebook</Label>
                            <Info>{profile.facebook}</Info>
                            <Label>Skype</Label>
                            <Info>{profile.skype}</Info>
                            <Label>{translate('birth_date')}</Label>
                            <Info>{profile.birthDate}</Info>
                        </TextContainer>
                        <Separator />
                        <ListContainer>
                            <TabView
                                navigationState={tabState}
                                renderScene={renderScene}
                                onIndexChange={onTabChange}
                            />
                        </ListContainer>
                    </InnerContainer>
                )}
            </InfoContainer>
        </Container>
    );
}

Student.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        getParam: PropTypes.func.isRequired,
    }).isRequired,
};
