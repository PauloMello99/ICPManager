import styled from 'styled-components/native';
import Ripple from 'react-native-material-ripple';

export const Container = styled(Ripple).attrs(props =>
    props.transparent
        ? {
              rippleContainerBorderRadius: 8,
              disabled: props.loading,
          }
        : {
              shadowColor: '#000',
              shadowOffset: {
                  width: 0,
                  height: 6,
              },
              shadowOpacity: 0.37,
              shadowRadius: 7.49,

              elevation: 6,

              rippleContainerBorderRadius: 8,
              disabled: props.loading,
          }
)`
    align-items: center;
    justify-content: center;

    height: 40px;

    border-radius: 8px;

    background: ${props => (props.transparent ? 'transparent' : '#01463B')};
`;

export const Text = styled.Text`
    padding: 3px 0 0 0;

    font-family: 'Poppins-Regular';
    font-size: 16px;

    color: ${props => (props.transparent ? '#01463B' : '#fff')};
`;
