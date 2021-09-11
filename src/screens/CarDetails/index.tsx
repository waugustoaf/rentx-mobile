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

export const CarDetails = () => {
  const carsImages = [
    'https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/ff5a98a2-fd1e-4585-84a9-d91a5947d7d0/61f4cdfb-46ba-4ae9-8c08-3414e91094af.png',
  ];

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={carsImages} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Audi</Brand>
            <Name>RS 5 Coupé</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory icon={speedSvg} name='380Km/h' />
          <Accessory icon={accelerationSvg} name='3.2s' />
          <Accessory icon={forceSvg} name='840 HP' />
          <Accessory icon={fuelSvg} name='Elétrico' />
          <Accessory icon={exchangeSvg} name='Auto' />
          <Accessory icon={peopleSvg} name='2 pessoas' />
        </Accessories>

        <About>
          Este é o automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title='Escolher período de aluguel' />
      </Footer>
    </Container>
  );
};
