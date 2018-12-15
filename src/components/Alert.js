import React, { Component } from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';

import Text from '../components/Text';

const mapStoreToProps = store => ({
  isAlertOpen: store.alert.show,
  alertText: store.alert.text,
  stick: store.alert.stick,
});

class Alert extends React.Component {
  constructor() {
    super();

    this.startY = -300;

    this.state = {
      animation: {
        show: new Animated.Value(this.startY),
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isAlertOpen && this.props.isAlertOpen) {
      const animateds = this.getAnimateds();

      Animated.stagger(4000, [...animateds]).start();
    } else if (prevProps.isAlertOpen && !this.props.isAlertOpen) {
      Animated.timing(this.state.animation.show, {
        toValue: this.startY,
        duration: 350,
      }).start();
    }
  }

  getAnimateds() {
    const animateds = [
      Animated.timing(this.state.animation.show, {
        toValue: 0,
        duration: 350,
      }),
    ];

    if (!this.props.stick) {
      animateds.push(
        Animated.timing(this.state.animation.show, {
          toValue: this.startY,
          duration: 350,
        }),
      );
    }

    return animateds;
  }

  render() {
    return (
      <Animated.View
        style={[
          {
            paddingTop: Constants.statusBarHeight + 20,
            paddingHorizontal: 20,
            paddingBottom: 20,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'tomato',
            transform: [{ translateY: this.state.animation.show }],
          },
        ]}
      >
        <Text
          color="white"
          size={14}
          style={{
            textShadowOffset: { width: 0, height: 1 },
            textShadowColor: 'rgba(0,0,0, 0.16)',
            textShadowRadius: 2,
          }}
        >
          {this.props.alertText}
        </Text>
      </Animated.View>
    );
  }
}

export default connect(mapStoreToProps)(Alert);
