import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../hooks/auth';
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

export const Routes = () => {
  const { user } = useAuth();
  1;
  return (
    <NavigationContainer>
      {user?.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
