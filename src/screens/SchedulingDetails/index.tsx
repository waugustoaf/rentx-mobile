import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import {
  addHours,
  differenceInDays,
  eachDayOfInterval,
  format,
} from 'date-fns';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import accelerationSvg from '../../assets/acceleration.svg';
import exchangeSvg from '../../assets/exchange.svg';
import forceSvg from '../../assets/force.svg';
import fuelSvg from '../../assets/fuel.svg';
import peopleSvg from '../../assets/people.svg';
import speedSvg from '../../assets/speed.svg';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';
import { Load } from '../../components/Load';
import { ICarDTO } from '../../dtos/ICarDTO';
import { IScheduleByUserDTO } from '../../dtos/IScheduleByUserDTO';
import { useCars } from '../../hooks/cars';
import { api } from '../../services/api';
import { getPlatformDate } from '../../utils/getPlatformDate';
import {
  Accessories,
  Brand,
  CalendarIcon,
  CarImages,
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
  RentalPeriod,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

interface ReceivedProps {
  car: ICarDTO;
  startDate: number;
  endDate: number;
}

const svg = {
  speed: speedSvg,
  acceleration: accelerationSvg,
  turning_diameter: forceSvg,
  gasoline_motor: fuelSvg,
  electric_motor: fuelSvg,
  hybrid_motor: fuelSvg,
  exchange: exchangeSvg,
  seats: peopleSvg,
};

export const SchedulingDetails = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { car, endDate, startDate } = route.params as ReceivedProps;
  const { rentCar } = useCars();
  const daysRented = differenceInDays(new Date(endDate), new Date(startDate));
  const total = daysRented * car.price;

  const carsImages = car.photos;

  const eachDay = eachDayOfInterval({
    start: getPlatformDate(new Date(startDate)),
    end: getPlatformDate(new Date(endDate)),
  }).map(date => format(addHours(date, 3), 'yyyy-MM-dd'));

  const handleConfirmRental = async () => {
    setLoading(true);
    const schedulesByCar = (await api.get(`/schedules_bycars/${car.id}`)).data;

    if (
      eachDay.filter(
        day =>
          schedulesByCar &&
          schedulesByCar.unavailable_dates &&
          schedulesByCar.unavailable_dates.includes(day),
      ).length > 0
    ) {
      Alert.alert(
        'Há um problema',
        'Já existe locações desse veículo nessa data',
      );
      return navigation.navigate('Home');
    }

    const alreadyExistentData = !!schedulesByCar.unavailable_dates
      ? schedulesByCar.unavailable_dates
      : [];

    const unavailableDates = [...alreadyExistentData, ...eachDay];

    const newSchedule: IScheduleByUserDTO = {
      car,
      startDate: format(getPlatformDate(new Date(startDate)), 'dd/MM/yyyy'),
      endDate: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
      id: new Date().getTime(),
      user_id: 1,
    };

    const scheduleUsers = api.post('/schedules_byuser', newSchedule);
    const scheduleCars = api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates: unavailableDates,
    });

    axios
      .all([scheduleUsers, scheduleCars])
      .then(() => {
        setLoading(false);
        if (
          new Date(addHours(startDate, 3)).getDate() === new Date().getDate()
        ) {
          rentCar(car.id);
        }
        navigation.navigate('Confirmation', {
          title: 'Carro alugado!',
          message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel`,
          nextScreen: 'Home',
        });
      })
      .catch(err => {
        console.log(err);
        Alert.alert(
          'Houve um erro!',
          'Não foi possível realizar seu agendamento.',
        );
        navigation.navigate('Home');
      });
  };

  const handleNavigateToCalendar = () => {
    navigation.navigate('Scheduling', {
      car,
    });
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const theme = useTheme();

  const formattedStartDate = format(
    addHours(new Date(startDate), 3),
    'dd/MM/yyyy',
  );
  const formattedEndtDate = format(
    addHours(new Date(endDate), 3),
    'dd/MM/yyyy',
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={carsImages} />
      </CarImages>

      {loading ? (
        <Load />
      ) : (
        <Content>
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.period}</Period>
              <Price>{`R$ ${car.price}`}</Price>
            </Rent>
          </Details>

          <Accessories>
            {car.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                icon={svg[accessory.type]}
                name={accessory.name}
              />
            ))}
          </Accessories>

          <RentalPeriod onPress={handleNavigateToCalendar}>
            <CalendarIcon>
              <Feather
                name='calendar'
                size={RFValue(24)}
                color={theme.colors.shape}
              />
            </CalendarIcon>

            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>{formattedStartDate}</DateValue>
            </DateInfo>

            <Feather
              name='chevron-right'
              size={RFValue(10)}
              color={theme.colors.text}
            />

            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue>{formattedEndtDate}</DateValue>
            </DateInfo>
          </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>{`R$ ${car.price} x${daysRented} diárias`}</RentalPriceQuota>
              <RentalPriceTotal>{`R$ ${total}`}</RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>
        </Content>
      )}

      <Footer>
        <Button
          color={theme.colors.success}
          title='Alugar agora'
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};
