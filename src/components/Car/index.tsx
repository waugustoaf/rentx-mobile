import React from 'react';
import FuelSVG from '../../assets/fuel.svg';
import EnergySVG from '../../assets/energy.svg';
import { ICarDTO } from '../../dtos/ICarDTO';
import {
  About,
  Brand,
  CarImage,
  Container,
  Details,
  Name,
  Period,
  Price,
  Rent,
  Type,
} from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Car as CarModel } from '../../database/models/Car';

interface CarProps extends RectButtonProps {
  car: CarModel;
}

export const Car = ({
  car: { brand, name, period, price, fuel_type, thumbnail },
  ...rest
}: CarProps) => {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{period}</Period>
            <Price>{price}</Price>
          </Rent>

          <Type>{fuel_type === 'electric' ? <EnergySVG /> : <FuelSVG />}</Type>
        </About>
      </Details>

      <CarImage
        resizeMode='contain'
        source={{
          uri: thumbnail,
        }}
      />
    </Container>
  );
};
