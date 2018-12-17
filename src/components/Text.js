import React from 'react';
import { Text as NativeText, Dimensions } from 'react-native';

const { width: DEVICE_WIDTH } = Dimensions.get('window');

const mapWeight = {
  '100': 'light',
  '200': 'light',
  '300': 'book',
  '400': 'book',
  '500': 'roman',
  '600': 'medium',
  '700': 'heavy',
  '800': 'black',
  '900': 'black',
  lighter: 'light',
  light: 'book',
  normal: 'roman',
  medium: 'medium',
  bold: 'heavy',
  bolder: 'black',
};

const mapStyle = {
  italic: 'oblique',
};

class Text extends React.Component {
  setNativeProps = nativeProps => {
    this._root.setNativeProps(nativeProps);
  };

  render() {
    const {
      weight: fontWeight = 'normal',
      fontStyle = '',
      color = 'black',
      size: fontSize = 14,
      style,
      children,
      ...rest
    } = this.props;

    let styles = {
      fontFamily: `avenir-${mapWeight[fontWeight]}${
        fontStyle !== '' ? '-' + mapStyle[fontStyle] : ''
      }`,
      color,
    };

    if (DEVICE_WIDTH > 375) {
      styles = {
        ...styles,
        fontSize,
      };
    }

    return (
      <NativeText
        ref={ref => (this._root = ref)}
        {...rest}
        adjustsFontSizeToFit={DEVICE_WIDTH <= 375}
        style={[styles, style]}
      >
        {children}
      </NativeText>
    );
  }
}

export default Text;
