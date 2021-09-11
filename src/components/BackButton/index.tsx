import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Container } from './styles';

interface BackButtonProps extends BorderlessButtonProps {
  color?: string;
}

export const BackButton = ({ color, ...rest }: BackButtonProps) => {
  const theme = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons
        name='chevron-left'
        size={24}
        color={color || theme.colors.text}
      />
    </Container>
  );
};
