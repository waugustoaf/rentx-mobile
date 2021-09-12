import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { CarDetails } from '../screens/CarDetails';
import { MyCars } from '../screens/MyCars';

const { Navigator, Screen } = createStackNavigator();

export const StackRoutes = () => {
  return (
    <Navigator initialRouteName='Home' headerMode='none'>
      <Screen name='Home' component={Home} />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Scheduling' component={Scheduling} />
      <Screen name='SchedulingDetails' component={SchedulingDetails} />
      <Screen name='SchedulingComplete' component={SchedulingComplete} />
      <Screen name='MyCars' component={MyCars} />
    </Navigator>
  );
};
