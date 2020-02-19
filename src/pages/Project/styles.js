import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DefaultActionButton from 'react-native-action-button';
import { Bar } from 'react-native-progress';
import DefaultButton from '~/components/Button';

export const Container = styled.View`
    flex: 1;
`;

export const ModalContainer = styled.View`
    flex: 1;
    padding: 20px;
`;

export const Button = styled(DefaultButton)`
    flex: 0.5;
`;

export const RowContainer = styled.View`
    flex-direction: row;
`;

export const Title = styled.Text.attrs({
    numberOfLines: 2,
})`
    font-size: 24px;
    font-family: 'Montserrat-Bold';
    color: #01463b;
    text-align: center;
`;
export const Description = styled.Text.attrs({
    numberOfLines: 3,
})`
    font-family: 'Poppins-Regular';
    font-size: 14px;
    color: #bcbec0;
    text-align: center;
`;

export const ConfirmText = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 16px;
    color: #333;
    margin-bottom: 15px;
`;

export const Header = styled.View`
    align-items: center;
    padding: 0px 24px;
`;

export const ProgressContainer = styled.View`
    margin: 20px 24px;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

export const ProgressBar = styled(Bar).attrs({
    useNativeDriver: true,
    borderColor: '#ccc',
    color: '#309500',
    width: 202,
    animated: true,
})`
    flex: 0.8;
    width: 10px;
`;

export const StartIcon = styled(Icon).attrs({
    name: 'clock-start',
    size: 30,
    color: '#309500',
})``;

export const EndIcon = styled(Icon).attrs({
    name: 'clock-end',
    size: 30,
    color: '#cc6060',
})``;

export const Loading = styled.ActivityIndicator.attrs({
    size: 40,
})`
    align-self: center;
    margin-top: 40px;
`;

export const Separator = styled.View`
    height: 2px;
    width: 80%;
    background: #ddd;
    align-self: center;
    margin: 0px 0px 20px 0px;
`;

export const EditMembersIcon = styled(Icon).attrs({
    name: 'account-edit',
    size: 20,
    color: '#fff',
})``;

export const EditProjectIcon = styled(Icon).attrs({
    name: 'file-document-edit',
    size: 20,
    color: '#fff',
})``;

export const EditPhasesIcon = styled(Icon).attrs({
    name: 'playlist-edit',
    size: 20,
    color: '#fff',
})``;

export const EditInstituitionsIcon = styled(Icon).attrs({
    name: 'bank',
    size: 20,
    color: '#fff',
})``;

export const SettingsIcon = styled(Icon).attrs({
    name: 'settings-outline',
    size: 20,
    color: '#fff',
})``;

export const ActionButton = styled(DefaultActionButton).attrs({
    buttonColor: 'rgba(1, 70, 59, 1)',
    offsetX: 15,
    offsetY: 15,
    degrees: 180,
})``;
