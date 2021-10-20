import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
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
import { ICarDTO } from '../../dtos/ICarDTO';
import {
  About,
  Accessories,
  Brand,
  CarImages,
  Container,
  Content,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
} from './styles';

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
            <Period>{car.period}</Period>
            <Price>{car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.id}
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
