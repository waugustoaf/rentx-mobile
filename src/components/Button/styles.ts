import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps {
  color?: string;
}

interface TitleProps {
  light?: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;

  background-color: ${props => props.color || props.theme.colors.main};
`;

export const Title = styled.Text<TitleProps>`
  font-family: ${props => props.theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${props =>
    props.light ? props.theme.colors.header : props.theme.colors.shape};
`;
