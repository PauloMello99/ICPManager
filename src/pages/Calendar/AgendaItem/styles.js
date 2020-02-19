import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';

export const Container = styled(Ripple).attrs({
    rippleContainerBorderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 5.49,

    elevation: 6,
})`
    background-color: #fff;
    padding: 10px 15px;
    margin: 15px;
    border-radius: 8px;
    height: 80px;
`;

export const RowContainer = styled.View`
    flex-direction: row;
`;

export const ColumnContainer = styled.View`
    flex: 1;
`;

export const Title = styled.Text.attrs({
    numberOfLines: 2,
})`
    color: #707070;
    font-family: 'Poppins-Bold';
    font-size: 14px;
`;

export const Status = styled.Text.attrs({
    numberOfLines: 1,
})`
    color: #707070;
    font-family: 'Poppins-Regular';
    font-size: 16px;
`;

export const IconContainer = styled.View`
    background: ${props => props.color || '#333'};
    height: 60px;
    width: 60px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
`;

export const Description = styled.Text.attrs({
    numberOfLines: 2,
})`
    color: #707070;
    font-family: 'Poppins-Regular';
    font-size: 14px;
`;
