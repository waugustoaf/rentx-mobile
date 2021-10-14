import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';
import * as Yup from 'yup';
import { toast } from '../../../utils/toast';

export const SignUpFirstStep = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  const handleNextStep = async () => {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        email: Yup.string()
          .email('E-mail inválido')
          .required('Nome é obrigatório'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return toast.error({
          title: 'Erro no preenchimento!',
          body: err.message,
        });
      } else {
        return toast.error({
          title: 'Houve um erro!',
          body: 'Não foi possível avançar',
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName='user'
              placeholder='Nome'
              value={name}
              onChangeText={setName}
              isFilled={!!name}
            />
            <Input
              iconName='mail'
              placeholder='E-mail'
              value={email}
              onChangeText={setEmail}
              isFilled={!!email}
              keyboardType='email-address'
            />
            <Input
              iconName='credit-card'
              placeholder='CNH'
              value={driverLicense}
              onChangeText={setDriverLicense}
              isFilled={!!driverLicense}
              keyboardType='numeric'
            />
          </Form>

          <Button title='Próximo' onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
