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

interface CarProps {
  car: ICarDTO;
}

export const Car = ({
  car: { brand, name, rent, type, thumbnail },
}: CarProps) => {
  return (
    <Container>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{rent.period}</Period>
            <Price>{rent.price}</Price>
          </Rent>

          <Type>{type === 'electric' ? <EnergySVG /> : <FuelSVG />}</Type>
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
