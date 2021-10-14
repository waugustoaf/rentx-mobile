import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import DoneSvg from '../../assets/done.svg';
import LogoSvg from '../../assets/logo_background_gray.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import { StatusBar } from '../../components/StatusBar';
import { Container, Content, Footer, Message, Title } from './styles';

interface ConfirmationProps {
  title: string;
  message: string;
  nextScreen: string;
}

export const Confirmation = () => {
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();

  const { title, message, nextScreen } = route.params as ConfirmationProps;

  const handleGoHome = () => {
    navigation.navigate(nextScreen);
  };

  return (
    <Container>
      <StatusBar />
      <LogoSvg width={dimensions.width} />

      <Content>
        <DoneSvg height={80} width={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>

        <Footer>
          <ConfirmButton title='Ok' onPress={handleGoHome} />
        </Footer>
      </Content>
    </Container>
  );
};
