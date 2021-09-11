import { Feather } from '@expo/vector-icons';
import React from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
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
import { ICarDTO } from '../../dtos/ICarDTO';

interface ReceivedProps {
  car: ICarDTO;
  startDate: string;
  endDate: string;
}

const svg = {
  speed: speedSvg,
  acceleration: accelerationSvg,
  turning_diameter: forceSvg,
  gasoline_motor: fuelSvg,
  electric_motor: fuelSvg,
  exchange: exchangeSvg,
  seats: peopleSvg,
};
import { differenceInDays } from 'date-fns';

export const SchedulingDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { car, endDate, startDate } = route.params as ReceivedProps;
  const daysRented = differenceInDays(new Date(endDate), new Date(startDate));
  const total = daysRented * car.rent.price;

  const carsImages = [car.thumbnail];

  const handleConfirmRental = () => {
    navigation.navigate('SchedulingComplete');
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const theme = useTheme();

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={carsImages} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$ ${car.rent.price}`}</Price>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>11/09/2021</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>11/09/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${daysRented} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>{`R$ ${total}`}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

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
