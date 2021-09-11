import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.secondary_600};
  color: ${props => props.theme.colors.main};
  font-size: ${RFValue(18)}px;
  margin-top: 20%;
`;
