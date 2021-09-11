import React from 'react';
import { StatusBar } from 'react-native';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { ICarDTO } from '../../dtos/ICarDTO';

export const Home = () => {
  const cars = [
    {
      id: '1',
      brand: 'Audi',
      name: 'RS 5 Coupé',
      rent: {
        period: 'At day',
        price: 'R$ 120',
      },
      type: 'electric',
      thumbnail:
        'https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/ff5a98a2-fd1e-4585-84a9-d91a5947d7d0/61f4cdfb-46ba-4ae9-8c08-3414e91094af.png',
    },
  ] as ICarDTO[];

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={cars}
        renderItem={({ item: car }) => <Car car={car} />}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};
