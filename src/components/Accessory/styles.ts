import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 109px;
  height: 92px;

  justify-content: center;
  align-items: center;

  background-color: ${props => props.theme.colors.background_primary};

  padding: 16px;
  margin-top: 8px;
`;

export const Name = styled.Text`
  font-family: ${props => props.theme.fonts.primary_500};
  color: ${props => props.theme.colors.text};
  font-size: ${RFValue(13)}px;
  margin-top: 8px;
`;
