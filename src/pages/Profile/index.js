import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from 'react-navigation-hooks';
import translate from '~/languages';

import Button from '~/components/Button';
import ProfilePicture from '~/components/ProfilePicture';
import SettingsList from './SettingsList';

import { signOut, syncData } from '~/store/modules/auth/actions';
import NavigationService from '~/navigation/NavigationService';
import { changeStatusBarColor } from '~/store/modules/ui/actions';
import { userProfileRT } from '~/services/firebase';

import {
    Container,
    InfoContainer,
    DetailsContainer,
    PictureContainer,
    Info,
    Name,
    Separator,
    EditIcon,
    IconContainer,
    InnerContainer,
} from './styles';

export default function Profile() {
    const dispatch = useDispatch();
    const { name, email, picture, type, uid } = useSelector(
        state => state.auth
    );
    const typeText = translate(type);

    const logOut = () => {
        dispatch(signOut());
        NavigationService.navigate('LoginStack');
    };

    const onEditPress = () => NavigationService.navigate('EditProfile');

    useEffect(() => {
        const callback = res => {
            const info = res.val() || {};
            dispatch(
                syncData(
                    info.name,
                    info.email,
                    info.picture || '',
                    info.universityList
                )
            );
        };

        const sync = async () => {
            await userProfileRT(type, uid, callback);
        };
        sync();
    }, [dispatch, type, uid]);

    useFocusEffect(
        useCallback(() => {
            dispatch(changeStatusBarColor('#f1f1f1', 'dark-content'));
        }, [dispatch])
    );

    return (
        <Container>
            <InnerContainer>
                <PictureContainer>
                    <ProfilePicture source={picture} />
                    <Name>{name}</Name>
                </PictureContainer>
                <InfoContainer>
                    <DetailsContainer>
                        <InfoContainer>
                            <Info>{`${translate('email')}: `}</Info>
                            <Info>{email}</Info>
                        </InfoContainer>
                        <InfoContainer>
                            <Info>{`${translate('user')}: `} </Info>
                            <Info>{typeText}</Info>
                        </InfoContainer>
                    </DetailsContainer>
                    <IconContainer onPress={onEditPress}>
                        <EditIcon />
                    </IconContainer>
                </InfoContainer>
                <Separator />
                <SettingsList />
            </InnerContainer>
            <Button transparent onPress={logOut}>
                Log out
            </Button>
        </Container>
    );
}
