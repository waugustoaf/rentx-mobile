import { ReactNode } from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface DateValueProps {
  children?: ReactNode;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background_secondary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(325)}px;
  background-color: ${props => props.theme.colors.header};
  justify-content: center;
  padding: 25px;
  padding-top: ${getBottomSpace() + 30}px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.shape};
  font-family: ${props => props.theme.fonts.secondary_600};
  font-size: ${RFValue(34)}px;
  margin-top: 24px;
`;

export const RentalPeriod = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 32px;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  font-family: ${props => props.theme.fonts.secondary_500};
  color: ${props => props.theme.colors.text};
  font-size: ${RFValue(10)}px;
`;

export const DateValue = styled.Text<DateValueProps>`
  font-family: ${props => props.theme.fonts.primary_500};
  color: ${props => props.theme.colors.shape};
  font-size: ${RFValue(15)}px;

  ${props =>
    !props.children &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${props.theme.colors.text};
      padding-bottom: 5px;
    `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyles: {
    paddingBottom: 24,
  },
  showsVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
  padding: 24px;
`;
