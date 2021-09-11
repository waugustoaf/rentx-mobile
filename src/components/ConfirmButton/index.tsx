import React from 'react';
import { Container, Title } from './styles';

interface ConfirmButtonProps {
  title: string;
  onPress?: () => void;
}

export const ConfirmButton = ({ onPress, title }: ConfirmButtonProps) => {
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
};
