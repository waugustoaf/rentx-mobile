import React from 'react';
import { StackRoutes } from './stack.routes';
import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from '../screens/SignIn';

export const Routes = () => {
  return (
    <NavigationContainer>
      <SignIn />
      {/* <StackRoutes /> */}
    </NavigationContainer>
  );
};
