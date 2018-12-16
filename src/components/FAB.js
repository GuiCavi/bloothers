import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Constants } from 'expo';

class FAB extends Component {
  constructor() {
    super();

    this.POSITIONS = {
      TOP_LEFT: { top: Constants.statusBarHeight + 16, left: 16 },
      TOP_RIGHT: { top: Constants.statusBarHeight + 16, right: 16 },
      BOTTOM_LEFT: { bottom: 16, left: 16 },
      BOTTOM_RIGHT: { bottom: 16, right: 16 },
    };
  }

  getPosition(position) {
    return this.POSITIONS[position] || position;
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          {
            position: 'absolute',
          },
          this.getPosition(this.props.position),
        ]}
      >
        <View
          style={{
            width: 64,
            height: 64,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 32,
            elevation: 12,
            shadowColor: 'rgb(0,0,0)',
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.19,
          }}
        >
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }
}

export default FAB;
