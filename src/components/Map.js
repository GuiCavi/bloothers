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
    setTimeout(() => {
      this.animation.reset();
      this.animation.play();
    }, 1);
  }

  animateToRegion(location) {
    if (this.map) this.map.animateToRegion(location);
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
            speed={this.props.canLocate ? 1 : 0}
            source={require('../../assets/lottie/location-pin.json')}
          />

          <Text style={{ paddingTop: 200 }}>
            {this.props.canLocate
              ? i18n.map.gettingLocationText
              : i18n.alerts.location.locationDisabled}
          </Text>
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
