import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
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
import { format } from 'date-fns';

export const Scheduling = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps,
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps,
  );
  const [startDate, setStartDate] = useState<Date | string>('');
  const [endDate, setEndDate] = useState<Date | string>('');

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const car: ICarDTO = route.params as ICarDTO;

  const formatDate = (date: Date) => {
    const formattedDate = format(date, 'dd/MM/yyyy');

    return formattedDate;
  };

  const handleConfirmRental = () => {
    navigation.navigate('SchedulingDetails', {
      car,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
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

    setStartDate(new Date(start.dateString));
    setEndDate(new Date(end.dateString));
    setLastSelectedDate(end);
    const interval = generateInterval({ start, end });
    setMarkedDates(interval);
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
              {typeof startDate === 'string' ? '' : formatDate(startDate)}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>
              {typeof endDate === 'string' ? '' : formatDate(endDate)}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar onDayPress={handleChangeDate} markedDates={markedDates} />
      </Content>

      <Footer>
        <Button title='Confirmar' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
};
