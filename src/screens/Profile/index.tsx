import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { toast } from '../../utils/toast';
import {
  Container,
  Content,
  Header,
  HeaderTitle,
  HeaderTop,
  LogoutButton,
  Option,
  Options,
  OptionTitle,
  Photo,
  PhotoButton,
  PhotoContainer,
  Section,
} from './styles';

export const Profile = () => {
  const { user, signOut, updateUser } = useAuth();

  const [option, setOption] = useState<'data' | 'password'>('data');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleGoData = () => {
    setOption('data');
  };

  const handleGoPassword = () => {
    setOption('password');
  };

  const handlePickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    const typedResult = result as ImageInfo;

    if (typedResult.uri) {
      setAvatar(typedResult.uri);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const schema = Yup.object().shape({
        driver_license: Yup.string().required('CNH é obrigatória.'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = {
        ...user,
        avatar,
        name,
        driver_license: driverLicense,
      };

      await schema.validate(data);

      await updateUser(data);

      toast.success({
        title: 'Tudo certo!',
        body: 'Suas informações foram alteradas com sucesso!',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return toast.error({
          title: 'Erro no preenchimento!',
          body: err.message,
        });
      } else {
        return toast.error({
          title: 'Houve um erro!',
          body: 'Não foi possível atualizar o perfil.',
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.text} onPress={handleGoBack} />
              <HeaderTitle>Editar perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name='power' size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handlePickPhoto}>
                <Feather name='camera' size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option active={option === 'data'} onPress={handleGoData}>
                <OptionTitle active={option === 'data'}>Dados</OptionTitle>
              </Option>
              <Option active={option === 'password'} onPress={handleGoPassword}>
                <OptionTitle active={option === 'password'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            <Section>
              {option === 'data' ? (
                <>
                  <Input
                    iconName='user'
                    placeholder='Nome'
                    autoCorrect={false}
                    value={name}
                    onChangeText={setName}
                  />
                  <Input
                    iconName='mail'
                    editable={false}
                    defaultValue={user.email}
                    autoCorrect={false}
                  />
                  <Input
                    iconName='credit-card'
                    placeholder='CNH'
                    keyboardType='numeric'
                    value={driverLicense}
                    onChangeText={setDriverLicense}
                  />
                </>
              ) : (
                <>
                  <Input iconName='lock' placeholder='Senha atual' password />
                  <Input iconName='lock' placeholder='Nova senha' password />
                  <Input iconName='lock' placeholder='Repetir senha' password />
                </>
              )}
            </Section>

            <Button title='Salvar alterações' onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
