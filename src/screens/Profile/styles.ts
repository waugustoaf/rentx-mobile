import { Platform, StatusBar } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface OptionProps {
  active?: boolean;
}

export const Container = styled.View`
  background-color: ${props => props.theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${props => props.theme.colors.header};
  height: 210px;

  padding: 0 24px;
  align-items: center;
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${Platform.OS === 'android'
    ? StatusBar.currentHeight + 16
    : getStatusBarHeight() + 16}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${props => props.theme.fonts.secondary_600};
  color: ${props => props.theme.colors.background_secondary};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;

  background-color: ${props => props.theme.colors.shape};
  margin-top: 32px;
`;

export const Photo = styled.Image`
  flex: 1;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  width: 40px;
  height: 40px;

  position: absolute;
  bottom: 10px;
  right: 10px;

  justify-content: center;
  align-items: center;

  background-color: ${props => props.theme.colors.main};
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 98px;
`;

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.line};

  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 24px;
`;

export const Option = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<OptionProps>`
  border-bottom-width: 3px;
  border-bottom-color: ${props =>
    props.active ? props.theme.colors.main : 'transparent'};
  padding-bottom: 14px;
`;

export const OptionTitle = styled.Text<OptionProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${props =>
    props.active
      ? props.theme.fonts.secondary_600
      : props.theme.fonts.secondary_500};
  color: ${props =>
    props.active ? props.theme.colors.header : props.theme.colors.text_detail};
`;

export const Section = styled.View``;
