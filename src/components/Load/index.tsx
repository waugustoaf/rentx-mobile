import React from 'react';
import { Container, Title } from './styles';
import LottieView from 'lottie-react-native';
import loadAnimation from '../../assets/loadingCar.json';

export const Load = () => {
  return (
    <Container>
      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={{ width: '70%' }}
      />
      <Title>Carregando</Title>
    </Container>
  );
};
