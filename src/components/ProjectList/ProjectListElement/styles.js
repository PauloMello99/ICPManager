import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';

export const Card = styled(Ripple).attrs({
    rippleContainerBorderRadius: 14,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 6,
})`
    background: #fff;
    max-height: 80px;
    margin: 8px 14px;
    border-radius: 14px;
`;

export const InfoContainer = styled.View`
    flex: 0.75;
    padding: 8px 4px 8px 10px;
`;

export const StatsContainer = styled.View`
    flex: 0.25;
    justify-content: center;
    background-color: #01463b;
    border-radius: 14px;
    padding: 4px;
`;

export const RowContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
`;

export const Title = styled.Text.attrs({
    numberOfLines: 1,
})`
    color: #707070;
    font-family: 'Poppins-Bold';
    font-size: 14px;
`;

export const Stats = styled.Text.attrs({
    numberOfLines: 1,
})`
    color: #fff;
    font-family: 'Poppins-Regular';
    font-size: 14px;
`;

export const Description = styled.Text.attrs({
    numberOfLines: 2,
})`
    color: #707070;
    font-family: 'Poppins-Regular';
    font-size: 14px;
`;

export const UniversityIcon = styled(Icon).attrs({
    name: 'bank',
    size: 14,
    color: '#fff',
})``;

export const TaskIcon = styled(Icon).attrs({
    name: 'format-list-checks',
    size: 14,
    color: '#fff',
})``;
