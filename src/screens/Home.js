import React, { Component } from 'react';
import { View, Platform, Text, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MapView, Constants, Location, Permissions } from 'expo';
import { CustomIcon } from '../components';

import { AlertActions } from '../redux/actions';

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
      message: '',
    };
  }

  componentWillMount() {
    console.log(this.props);
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.props.actions.alert.toggle(
        'Opa, isso não vai funcionar em um emulador Android. Tente em um device!',
      );
    } else {
      this.getLocationAsync();
    }
  }

  async getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.props.actions.alert.toggle(
        'Permissão para acessar a localização negada',
        true,
      );
    } else {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <MapView style={{ ...StyleSheet.absoluteFillObject }} />
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
