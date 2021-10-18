import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { StatusBar } from '../../components/StatusBar';
import { AntDesign } from '@expo/vector-icons';
import { IScheduleByUserDTO } from '../../dtos/IScheduleByUserDTO';
import { api } from '../../services/api';
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarsList,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
  EmptyItemsView,
  EmptyItemsText,
} from './styles';
import { toast } from '../../utils/toast';

export const MyCars = () => {
  const [schedules, setSchedules] = useState<IScheduleByUserDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    let isActive = true;

    (async () => {
      if (isActive) {
        setLoading(true);

        try {
          const response = (await api.get('/rentals'))
            .data as IScheduleByUserDTO[];

          setSchedules(response);
          setLoading(false);
        } catch (err) {
          toast.error({
            title: 'Houve um erro',
            body: 'Não foi possível carregar seus carros.',
          });

          setLoading(false);
          navigation.navigate('Home');
        }
      }
    })();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <Container>
      <StatusBar />
      <Header>
        <BackButton onPress={handleBack} color={theme.colors.shape} />
        <Title>
          Escolha uma {'\n'}data de início e {'\n'}fim do aluguel
        </Title>

        <SubTitle>Conforto, Segurança e Praticidade</SubTitle>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>
              {String(schedules.length).padStart(2, '0')}
            </AppointmentsQuantity>
          </Appointments>

          {schedules.length === 0 ? (
            <EmptyItemsView>
              <EmptyItemsText>
                Você ainda não fez nenhum agendamento.
              </EmptyItemsText>
            </EmptyItemsView>
          ) : (
            <CarsList
              data={schedules}
              keyExtractor={schedule => schedule.id.toString()}
              renderItem={({ item: schedule }) => (
                <CarWrapper>
                  <Car car={schedule.car} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{schedule.startDate}</CarFooterDate>
                      <AntDesign
                        name='arrowright'
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{schedule.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />
          )}
        </Content>
      )}
    </Container>
  );
};
