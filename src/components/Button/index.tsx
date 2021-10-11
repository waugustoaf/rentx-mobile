import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  onPress?: () => void;
  enabled?: boolean;
  loading?: boolean;
  light?: boolean;
}

export const Button = ({
  title,
  enabled = true,
  loading,
  light,
  ...rest
}: ButtonProps) => {
  const theme = useTheme();
  const isButtonEnabled = enabled && !loading;

  return (
    <Container
      enabled={isButtonEnabled}
      style={{ opacity: isButtonEnabled ? 1 : 0.5 }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size='small'
          color={light ? theme.colors.header : theme.colors.shape}
        />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
};
