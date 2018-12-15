import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';

import { CustomIcon } from '../components';

const i18n = require('../strings')('pt-br');

class Campaign extends Component {
  static navigationOptions = {
    title: i18n.tabBar.campaign,
    tabBarIcon: ({ tintColor }) => (
      <CustomIcon name="badge" size={20} color={tintColor} />
    ),
  };

  render() {
    return <SafeAreaView style={{ flex: 1, backgroundColor: 'lightgreen' }} />;
  }
}

export default Campaign;
