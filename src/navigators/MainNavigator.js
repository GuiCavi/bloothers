import React from 'react';
import { View } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

import { Start } from '../screens';
import HomeTab from './HomeTab';

export default createSwitchNavigator(
  {
    Start: Start,
    App: HomeTab,
  },
  {
    initialRouteName: 'App',
  },
);
