import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';

import { CustomIcon } from '../components';

const i18n = require('../strings')('pt-br');

class Profile extends Component {
  static navigationOptions = {
    title: i18n.tabBar.profile,
    tabBarIcon: ({ tintColor }) => (
      <CustomIcon name="person" size={20} color={tintColor} />
    ),
  };

  render() {
    return <SafeAreaView style={{ flex: 1, backgroundColor: 'tomato' }} />;
  }
}

export default Profile;
