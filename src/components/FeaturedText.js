import React from 'react';
import { View } from 'react-native';

import Text from './Text';

const FeaturedText = ({ number, text }) => {
  return (
    <View style={{ alignItems: 'center', marginRight: 0 }}>
      <Text weight="bolder" size={20}>
        {number}
      </Text>
      <Text size={20}>{text}</Text>
    </View>
  );
};

export default FeaturedText;
