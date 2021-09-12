import { useNavigation, useRoute } from '@react-navigation/native';
import { addHours, format } from 'date-fns';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTheme } from 'styled-components';
import ArrowSvg from '../../assets/arrow.svg';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from '../../components/Calendar';
import { StatusBar } from '../../components/StatusBar';
import { ICarDTO } from '../../dtos/ICarDTO';
import { getPlatformDate } from '../../utils/getPlatformDate';
import {
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  Header,
  RentalPeriod,
  Title,
} from './styles';

interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

export const Scheduling = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps,
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps,
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod,
  );

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const car: ICarDTO = route.params as ICarDTO;

  const handleConfirmRental = () => {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      return Alert.alert(
        'Houve um erro ao continuar!',
        'Por favor, selecione um intervalo para alugar.',
      );
    }

    navigation.navigate('SchedulingDetails', {
      car,
      startDate: rentalPeriod.start,
      endDate: rentalPeriod.end,
    });
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleChangeDate = (date: DayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      let aux = start;
      start = end;
      end = aux;
    }

    setLastSelectedDate(end);
    const interval = generateInterval({ start, end });
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      end: end.timestamp,
      start: start.timestamp,
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy',
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  };

  return (
    <Container>
      <StatusBar />
      <Header>
        <BackButton onPress={handleGoBack} color={theme.colors.shape} />
        <Title>
          Escolha uma {'\n'}data de início e {'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>
              {!!rentalPeriod.startFormatted ? rentalPeriod.startFormatted : ''}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>
              {!!rentalPeriod.endFormatted ? rentalPeriod.endFormatted : ''}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar onDayPress={handleChangeDate} markedDates={markedDates} />
      </Content>

      <Footer>
        <Button
          title='Confirmar'
          enabled={!!rentalPeriod.start && !!rentalPeriod.end}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};
