import React from 'react';
import { AuthProvider } from './auth';
import { CarsProvider } from './cars';

export const HooksProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <CarsProvider>{children}</CarsProvider>
    </AuthProvider>
  );
};
