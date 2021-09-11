import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { Routes } from './routes';
import { CustomThemeProvider } from './styles/theme';
import { HooksProvider } from './hooks';

export const App = () => {
  const [isFontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!isFontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <CustomThemeProvider>
        <HooksProvider>
          <Routes />
        </HooksProvider>
      </CustomThemeProvider>
    </SafeAreaView>
  );
};
