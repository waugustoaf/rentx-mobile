import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Confirmation } from '../screens/Confirmation';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/FirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SecondStep';
import { Splash } from '../screens/Splash';

const { Navigator, Screen } = createStackNavigator();

export const AuthRoutes = () => {
  return (
    <Navigator initialRouteName='Splash' headerMode='none'>
      <Screen name='Splash' component={Splash} />
      <Screen name='SignIn' component={SignIn} />
      <Screen name='SignUpFirstStep' component={SignUpFirstStep} />
      <Screen name='SignUpSecondStep' component={SignUpSecondStep} />
      <Screen name='Confirmation' component={Confirmation} />
    </Navigator>
  );
};
