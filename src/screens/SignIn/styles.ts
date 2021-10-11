import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 24px;

  background-color: ${props => props.theme.colors.background_primary};
  border-color: transparent;
  border-width: 2px;
  padding-bottom: 8px;
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${RFValue(115) + getStatusBarHeight()}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${props => props.theme.fonts.secondary_600};
  color: ${props => props.theme.colors.title};
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${props => props.theme.fonts.primary_400};
  color: ${props => props.theme.colors.text};
  line-height: ${RFValue(25)}px;
  margin-top: ${RFValue(16)}px;
`;

export const Form = styled.View`
  width: 100%;
  margin: 64px 0;
`;

export const Footer = styled.View``;
