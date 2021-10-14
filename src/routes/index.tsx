import React from 'react';
import { StackRoutes } from './stack.routes';
import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/FirstStep';

export const Routes = () => {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
};
