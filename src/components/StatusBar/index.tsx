import React from 'react';
import {
  StatusBar as RNStatusBar,
  StatusBarProps as RNStatusBarProps,
} from 'react-native';

interface StatusBarProps extends RNStatusBarProps {
  darkContent?: boolean;
}

export const StatusBar = ({ darkContent, ...rest }: StatusBarProps) => {
  return (
    <RNStatusBar
      barStyle={darkContent ? 'dark-content' : 'light-content'}
      translucent
      backgroundColor='transparent'
      {...rest}
    />
  );
};
