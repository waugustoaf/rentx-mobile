import React from 'react';
import { Container } from './styles';

interface BulletProps {
  active?: boolean;
}

export const Bullet = ({ active }: BulletProps) => {
  return <Container active={active} />;
};
