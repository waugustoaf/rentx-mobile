import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { StatusBar } from '../../components/StatusBar';
import { useAuth } from '../../hooks/auth';
import { toast } from '../../utils/toast';
import { Container, Footer, Form, Header, SubTitle, Title } from './styles';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const theme = useTheme();
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatória'),
      });

      await schema.validate({ email, password });

      await signIn({
        email,
        password,
        callbackFunction: () => setLoading(false),
      });
    } catch (err) {
      setLoading(false);
      if (err instanceof Yup.ValidationError) {
        return toast.error({
          title: 'Campo inválido!',
          body: err.message,
        });
      } else {
        return toast.error({
          title: 'Erro na autenticação!',
          body: 'Ocorreu um erro ao fazer login, verifique as credenciais.',
        });
      }
    }
  };

  const handleNewAccount = () => {
    navigation.navigate('SignUpFirstStep');
  };

  return (
    <KeyboardAvoidingView
      behavior='position'
      style={{ backgroundColor: theme.colors.background_primary, flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar darkContent />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}uma experiência incrível
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              placeholderTextColor={theme.colors.text}
              value={email}
              onChangeText={setEmail}
              isFilled={!!email}
            />
            <Input
              iconName='lock'
              placeholder='Senha'
              placeholderTextColor={theme.colors.text}
              password
              value={password}
              onChangeText={setPassword}
              isFilled={!!password}
            />
          </Form>

          <Footer>
            <Button title='Login' onPress={handleSignIn} loading={loading} />
            <Button
              title='Criar conta gratuita'
              onPress={handleNewAccount}
              light
              loading={loading}
              color={theme.colors.background_secondary}
              style={{ marginTop: 8 }}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
