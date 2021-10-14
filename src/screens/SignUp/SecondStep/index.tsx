import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { api } from '../../../services/api';
import { toast } from '../../../utils/toast';
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  Subtitle,
  Title,
} from './styles';

interface ReceivedProps {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export const SignUpSecondStep = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const {
    user: { name, email, driverLicense },
  } = route.params as ReceivedProps;

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  const handleRegister = async () => {
    setLoading(true);

    try {
      const schema = Yup.object().shape({
        confirmPassword: Yup.string()
          .required('Confirmação de senha obrigatória.')
          .oneOf([Yup.ref('password'), null], 'Senhas diferentes.'),
        password: Yup.string().required('Senha é obrigatória.'),
      });

      const data = { password, confirmPassword };
      await schema.validate(data);

      await api.post('/users', {
        name,
        email,
        password,
        driver_license: driverLicense,
      });

      navigation.navigate('Confirmation', {
        title: 'Conta criada!',
        message: `Agora é so fazer login\ne aproveitar`,
        nextScreen: 'SignIn',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return toast.error({
          title: 'Erro no preenchimento',
          body: err.message,
        });
      } else {
        console.log(err);

        return toast.error({
          title: 'Houve um erro',
          body: 'Não foi possível registrar',
        });
      }
    } finally {
      setLoading(false);
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
            <FormTitle>2. Senha</FormTitle>
            <Input
              iconName='lock'
              placeholder='Senha'
              value={password}
              onChangeText={setPassword}
              isFilled={!!password}
              password
            />
            <Input
              iconName='lock'
              placeholder='Confirmar senha'
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isFilled={!!confirmPassword}
              password
            />
          </Form>

          <Button
            title='Cadastrar'
            color={theme.colors.success}
            onPress={handleRegister}
            loading={loading}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
