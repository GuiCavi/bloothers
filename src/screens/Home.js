import React, { Component } from 'react';
import { View, Platform } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MapView, Constants, Location, Permissions } from 'expo';

import { CustomIcon, Map, FAB } from '../components';
import { AlertActions } from '../redux/actions';

import Resources from '../../assets/server/resources';

import Colors from '../utils/colors';

const i18n = require('../strings')('pt-br');

class Home extends Component {
  static navigationOptions = {
    title: i18n.tabBar.hemocenter,
    tabBarIcon: ({ tintColor }) => (
      <CustomIcon name="pin" size={20} color={tintColor} />
    ),
  };

  constructor() {
    super();

    this.state = {
      hemocenters: [],
      location: {
        latitudeDelta: 10,
        longitudeDelta: 10,
      },
      canLocate: true,
    };

    this.resetMapCamera = this.resetMapCamera.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.props.actions.alert.toggle(i18n.alerts.location.notAndroidDevice);
    } else {
      setTimeout(() => {
        this.getLocationAsync();
      }, 1500);
    }

    this.loadHemocenter();
  }

  async loadHemocenter() {
    const hemocenters = await (await Resources.hemocenter.get()).json();

    this.setState({
      hemocenters,
    });
  }

  async getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.props.actions.alert.toggle(
        i18n.alerts.location.permissionDenied,
        true,
      );
    } else {
      try {
        let location = await Location.getCurrentPositionAsync({});
        this.setState({
          location: {
            ...this.state.location,
            ...location.coords,
          },
        });
      } catch (e) {
        this.setState(
          {
            canLocate: false,
          },
          () =>
            this.props.actions.alert.toggle(
              i18n.alerts.location.locationDisabled,
            ),
        );
      }
    }
  }

  resetMapCamera() {
    this.map.animateToRegion({
      latitude: this.state.location.latitude,
      longitude: this.state.location.longitude,
      latitudeDelta: this.state.location.latitudeDelta,
      longitudeDelta: this.state.location.longitudeDelta,
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Map
          ref={map => (this.map = map)}
          location={this.state.location}
          canLocate={this.state.canLocate}
          markers={this.state.hemocenters}
        />

        {this.state.location.latitude && this.state.location.longitude && (
          <FAB position="TOP_RIGHT" onPress={this.resetMapCamera}>
            <CustomIcon name="target" size={30} color={Colors.theme.primary} />
          </FAB>
        )}
      </View>
    );
  }
}

const mapStoreToProps = store => ({});

const mapDispatchToProps = dispatch => ({
  actions: { alert: bindActionCreators(AlertActions, dispatch) },
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(Home);
