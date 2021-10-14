import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { Scheduling } from '../screens/Scheduling';
import { Confirmation } from '../screens/Confirmation';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { CarDetails } from '../screens/CarDetails';
import { MyCars } from '../screens/MyCars';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/FirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SecondStep';

const { Navigator, Screen } = createStackNavigator();

export const StackRoutes = () => {
  return (
    <Navigator initialRouteName='SignIn' headerMode='none'>
      <Screen name='Home' component={Home} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Scheduling' component={Scheduling} />
      <Screen name='SchedulingDetails' component={SchedulingDetails} />
      <Screen name='Confirmation' component={Confirmation} />
      <Screen name='MyCars' component={MyCars} />
      <Screen name='SignIn' component={SignIn} />
      <Screen name='SignUpFirstStep' component={SignUpFirstStep} />
      <Screen name='SignUpSecondStep' component={SignUpSecondStep} />
    </Navigator>
  );
};
