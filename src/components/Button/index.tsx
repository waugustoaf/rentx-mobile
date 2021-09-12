import React from 'react';
import { Container, Title } from './styles';

interface ButtonProps {
  title: string;
  color?: string;
  onPress?: () => void;
  enabled?: boolean;
}

export const Button = ({ title, enabled = true, ...rest }: ButtonProps) => {
  return (
    <Container
      enabled={enabled}
      {...rest}
      style={{ opacity: enabled ? 1 : 0.5 }}
    >
      <Title>{title}</Title>
    </Container>
  );
};
