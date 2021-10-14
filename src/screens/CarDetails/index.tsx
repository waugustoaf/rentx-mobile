import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import fuelSvg from '../../assets/fuel.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Accessories,
  CarImages,
  Container,
  Header,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Footer,
} from './styles';
import { Button } from '../../components/Button';
import { ICarDTO } from '../../dtos/ICarDTO';

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

export const CarDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const car: ICarDTO = route.params as ICarDTO;

  const handleConfirmRental = () => {
    navigation.navigate('Scheduling', car);
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{car.rent.price}</Price>
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

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          title='Escolher período de aluguel'
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};
