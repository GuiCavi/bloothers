import React from 'react';
import { View } from 'react-native';

import Text from './Text';

import Colors from '../utils/colors';

const DisplayFormData = ({ field, data, styles }) => {
  if (Array.isArray(field) && Array.isArray(data)) {
    const fields = field.map((_field, index) => (
      <View
        key={index}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            borderRightColor: Colors.theme.lightgrey,
            borderRightWidth: index === field.length - 1 ? 0 : 1,
          },
          styles[index],
        ]}
      >
        <Text
          color={Colors.theme.textSecondary}
          weight="medium"
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          {_field}
        </Text>
        <Text
          color={Colors.theme.text}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          {data[index]}
        </Text>
      </View>
    ));

    return <View style={{ flexDirection: 'row' }}>{fields}</View>;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
        borderBottomColor: Colors.theme.lightgrey,
        borderBottomWidth: 1,
      }}
    >
      <Text
        color={Colors.theme.textSecondary}
        // size={16}
        adjustsFontSizeToFit
        minimumFontScale={0.5}
        weight="medium"
      >
        {field}
      </Text>
      <Text
        color={Colors.theme.text}
        // size={16}
        numberOfLines={1}
        minimumFontScale={0.5}
        adjustsFontSizeToFit
      >
        {data}
      </Text>
    </View>
  );
};

export default DisplayFormData;
