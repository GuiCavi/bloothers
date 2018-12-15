import React, { Component } from 'react';
import { View } from 'react-native';

import { AppLoading } from 'expo';

import { CustomIcon } from '../components';

class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'tomato' }}>
        <CustomIcon name="back-arrow" size={22} />
        <CustomIcon name="badge" size={22} />
        <CustomIcon name="close" size={22} />
        <CustomIcon name="person" size={22} />
        <CustomIcon name="pin" size={22} />
        <CustomIcon name="target" size={22} />
      </View>
    );
  }
}

export default StartScreen;
