import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { ICarDTO } from '../../dtos/ICarDTO';
import { useCars } from '../../hooks/cars';
import {
  CarList,
  Container,
  Header,
  HeaderContent,
  MyCarsButton,
  TotalCars,
} from './styles';

export const Home = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const { cars, loading } = useCars();

  const handleNavigateCarDetails = (car: ICarDTO) => {
    navigation.navigate('CarDetails', car);
  };

  const handleOpenMyCars = () => {
    navigation.navigate('MyCars');
  };

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

      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          renderItem={({ item: car }) => (
            <Car onPress={() => handleNavigateCarDetails(car)} car={car} />
          )}
          keyExtractor={item => item.id}
        />
      )}

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons name='ios-car-sport' size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  );
};
