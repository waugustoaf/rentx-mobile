import { TextInput } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.colors.background_secondary};
  margin-bottom: 8px;
  border-bottom-width: 2px;
  border-bottom-color: ${props =>
    props.isFocused ? props.theme.colors.main : 'transparent'};
`;

export const IconContainer = styled.View`
  height: 56px;
  width: 56px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.background_secondary};
  border-right-color: ${props => props.theme.colors.background_primary};
  border-right-width: 2px;
`;

export const InputText = styled(TextInput)`
  flex: 1;
  height: 100%;
  background-color: ${props => props.theme.colors.background_secondary};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;
`;

export const EyeButton = styled(BorderlessButton)`
  margin-right: 16px;
  margin-left: 8px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;
