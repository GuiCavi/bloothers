import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

import Text from './Text';

import Colors from '../utils/colors';

class Button extends Component {
  render() {
    const { outline } = this.props;

    let stylesButton = {
      borderRadius: 4,
      backgroundColor: Colors.theme.primary,
      paddingHorizontal: 20,
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    };

    let stylesText = {
      size: 16,
      color: 'white',
    };

    if (outline) {
      stylesButton = {
        ...stylesButton,
        borderColor: Colors.theme.primary,
        borderWidth: 1,
        backgroundColor: 'transparent',
      };

      stylesText = {
        ...stylesText,
        color: Colors.theme.primary,
      };
    }

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={stylesButton}>
          <Text {...stylesText} style={{ textAlign: 'center' }}>
            {this.props.children}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Button;
