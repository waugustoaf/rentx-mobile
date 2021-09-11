import React from 'react';
import { CarsProvider } from './cars';

export const HooksProvider: React.FC = ({ children }) => {
  return <CarsProvider>{children}</CarsProvider>;
};
