import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import md5 from 'md5';

import { MapView, DangerZone } from 'expo';
const { Lottie } = DangerZone;

import Text from './Text';

const i18n = require('../strings')('pt-br');

class Map extends Component {
  constructor() {
    super();

    this.state = {
      animation: null,
    };
  }

  componentDidMount() {
    this.playAnimation();
  }

  playAnimation() {
    this.animation.reset();
    this.animation.play();
  }

  animateToRegion(location) {
    this.map.animateToRegion(location);
  }

  render() {
    const { Marker } = MapView;

    if (!this.props.location.latitude && !this.props.location.longitude) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            source={require('../../assets/lottie/location.json')}
          />
          <View style={{ paddingTop: 120 }}>
            <Text>{i18n.map.gettingLocationText}</Text>
          </View>
        </View>
      );
    }

    let markers = [];

    if (this.props.markers) {
      markers = this.props.markers.map(marker => (
        <Marker
          key={md5(JSON.stringify(marker.location))}
          coordinate={marker.location}
          title={marker.nome}
          image={require('../../assets/images/marker.png')}
        />
      ));
    }

    return (
      <MapView
        ref={map => (this.map = map)}
        {...this.props}
        style={{ ...StyleSheet.absoluteFillObject }}
        initialRegion={this.props.location}
        region={this.props.location}
      >
        <Marker
          coordinate={{
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude,
          }}
        />
        {markers}
      </MapView>
    );
  }
}

export default Map;
