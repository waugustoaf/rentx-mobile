import React from 'react';
import { useWindowDimensions } from 'react-native';
import DoneSvg from '../../assets/done.svg';
import LogoSvg from '../../assets/logo_background_gray.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import { StatusBar } from '../../components/StatusBar';
import { useNavigation } from '@react-navigation/native';
import { Container, Content, Footer, Message, Title } from './styles';

export const SchedulingComplete = () => {
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <Container>
      <StatusBar />
      <LogoSvg width={dimensions.width} />

      <Content>
        <DoneSvg height={80} width={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RentX {'\n'}
          pegar o seu automóvel
        </Message>

        <Footer>
          <ConfirmButton title='Ok' onPress={handleGoHome} />
        </Footer>
      </Content>
    </Container>
  );
};
