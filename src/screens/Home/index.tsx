import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Button, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { ICarDTO } from '../../dtos/ICarDTO';
import { useCars } from '../../hooks/cars';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';
import { api } from '../../services/api';
import { Car as CarModel } from '../../database/models/Car';

export const Home = () => {
  const navigation = useNavigation();

  const { cars, loading } = useCars();
  const { isConnected } = useNetInfo();

  const handleNavigateCarDetails = (car: CarModel) => {
    navigation.navigate('CarDetails', car);
  };

  const offlineSynchronize = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(
          `/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`,
        );

        const { changes, latestVersion } = data;

        if (!lastPulledAt) {
          changes.cars.updated = [];
          changes.cars.deleted = [];
        }

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const users = changes.users;

        await api.post('/users/sync', users);
      },
    });
  };

  useEffect(() => {
    if (isConnected) {
      offlineSynchronize();
    }
  }, [isConnected]);

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
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>

      <Button title='Sincronizar' onPress={offlineSynchronize} />

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
    </Container>
  );
};
