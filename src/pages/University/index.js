import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFocusEffect } from 'react-navigation-hooks';
import { useDispatch } from 'react-redux';
import translate from '~/languages';

import { showErrorSnackbar } from '~/services/Snackbar';
import { universityRT } from '~/services/firebase';
import { changeStatusBarColor } from '~/store/modules/ui/actions';

import AppBar from '~/components/Appbar';

import {
    Container,
    Label,
    Info,
    Loading,
    TextContainer,
    UniversityPicture,
    InnerContainer,
    Header,
    HeaderContainer,
} from './styles';

export default function University({ navigation }) {
    const id = navigation.getParam('id');
    const dispatch = useDispatch();

    const [university, setUniversity] = useState();
    const [loading, setLoading] = useState(true);

    const onBackPress = () => navigation.goBack();

    useEffect(() => {
        setLoading(true);
        const loadStudent = async () =>
            universityRT(id, async snapshot => {
                try {
                    const res = snapshot.val();
                    setUniversity(res);
                    setLoading(false);
                } catch (err) {
                    showErrorSnackbar(translate('university_load_failure'));
                    navigation.goBack();
                }
            });
        if (!id) {
            showErrorSnackbar(translate('university_load_failure'));
            navigation.goBack();
        }
        loadStudent();
    }, [id, navigation]);

    useFocusEffect(
        useCallback(() => {
            dispatch(changeStatusBarColor('#01463B', 'light-content'));
        }, [dispatch])
    );

    return (
        <Container>
            <HeaderContainer>
                <Header>
                    <AppBar
                        onBackPress={onBackPress}
                        title={translate('instituition')}
                        dark
                    />
                </Header>
            </HeaderContainer>

            {loading ? (
                <Loading />
            ) : (
                <InnerContainer>
                    <UniversityPicture source={{ uri: university.picture }} />
                    <TextContainer>
                        <Label>{translate('register_name')}</Label>
                        <Info>{university.name}</Info>
                        <Label>{translate('acronym')}</Label>
                        <Info>{university.acronym}</Info>
                        <Label>{translate('state')}</Label>
                        <Info>{university.state}</Info>
                        <Label>{translate('country')}</Label>
                        <Info>{university.country}</Info>
                    </TextContainer>
                </InnerContainer>
            )}
        </Container>
    );
}

University.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        getParam: PropTypes.func.isRequired,
    }).isRequired,
};
