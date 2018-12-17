import React from 'react';
import { View } from 'react-native';

import Colors from '../utils/colors';

const Block = ({ style, children }) => {
  return (
    <View
      style={[
        {
          borderColor: Colors.theme.lightgrey,
          borderWidth: 1,
          borderRadius: 4,
          padding: 10,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Block;
