import React from 'react';

import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import { Home, Profile, Campaign } from '../screens';
import Colors from '../utils/colors';

const TabBarComponent = props => <BottomTabBar {...props} />;

const routes = {
  Home,
  Profile,
  // Campaign,
};

const config = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarOptions: {
      safeAreaInset: {
        bottom: 'never',
      },
      activeTintColor: Colors.theme.primary,
      inactiveTintColor: Colors.theme.primaryAlpha,
      labelStyle: {
        marginTop: -12,
        paddingBottom: 12,
        fontFamily: 'avenir-book',
        fontSize: 14,
      },
    },
  }),
  tabBarComponent: props => (
    <TabBarComponent
      {...props}
      style={{
        backgroundColor: 'white',
        borderTopWidth: 0,
        borderRadius: 4,
        position: 'absolute',
        height: 72,
        bottom: 40,
        left: 20,
        right: 20,
        elevation: 12,
        shadowColor: 'rgb(0,0,0)',
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.19,
      }}
    />
  ),
};

export default createBottomTabNavigator(routes, config);
