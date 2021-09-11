import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { CarDetails } from './screens/CarDetails';
import { Home } from './screens/Home';
import { CustomThemeProvider } from './styles/theme';

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
        <CarDetails />
      </CustomThemeProvider>
    </SafeAreaView>
  );
};
