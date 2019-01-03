import React, { Component } from 'react';
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Constants, DangerZone } from 'expo';
const { Lottie } = DangerZone;

import Moment from 'moment';
import 'moment/locale/pt-br';

import {
  CustomIcon,
  Text,
  Button,
  FeaturedText,
  Block,
  DisplayFormData,
} from '../components';
import Colors from '../utils/colors';
import { getImageHeight } from '../utils/helpers';
import Resources from '../../assets/server/resources';

const i18n = require('../strings')('pt-br');
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

class Profile extends Component {
  static navigationOptions = {
    title: i18n.tabBar.profile,
    tabBarIcon: ({ tintColor }) => (
      <CustomIcon name="person" size={20} color={tintColor} />
    ),
  };

  constructor() {
    super();

    this.state = {
      donator: {},
    };

    this.getProfileImage = this.getProfileImage.bind(this);
  }

  componentDidMount() {
    this.playAnimation();
    setTimeout(() => {
      this.loadDonator();
    }, 1500);
  }

  playAnimation() {
    setTimeout(() => {
      this.animation.reset();
      this.animation.play();
    }, 1);
  }

  async loadDonator() {
    const donator = (await (await Resources.donator.get(
      '12345678910',
      // '10987654321',
    )).json())[0];
    console.log(donator);

    this.setState({
      donator,
    });
  }

  getProfileImage() {
    if (!this.state.donator.profile_image) {
      if (this.state.donator.genero === 'Masculino')
        return require('../../assets/images/man.png');

      return require('../../assets/images/women.png');
    }

    return {
      uri: this.state.donator.profile_image,
    };
  }

  render() {
    if (Object.keys(this.state.donator).length === 0) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            source={require('../../assets/lottie/downloader.json')}
            style={{
              ...StyleSheet.absoluteFillObject,
              top: Platform.select({ ios: -55, android: 0 }),
              transform: [{ scale: Platform.select({ ios: 0.8, android: 1 }) }],
            }}
          />

          <Text style={{ paddingTop: 200 }}>{i18n.profile.gettingData}</Text>
        </View>
      );
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <SafeAreaView style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 30,
              marginBottom: 30,
            }}
          >
            <View style={styles.profileImageContainer}>
              <Image
                source={this.getProfileImage()}
                style={styles.profileImage}
              />
              <ImageBackground
                source={require('../../assets/images/blood.png')}
                style={styles.bloodText}
                resizeMode="center"
              >
                <Text color="white" size={16} weight="bold">
                  {this.state.donator.bloodType}
                </Text>
              </ImageBackground>
            </View>

            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginBottom: 20,
                }}
              >
                <FeaturedText
                  number={this.state.donator.doacoes}
                  text={i18n.texts.howManyDonations}
                />
                <FeaturedText
                  number={this.state.donator.vidas_salvas}
                  text={i18n.texts.howManySavedLives}
                />
              </View>

              <Button outline>{i18n.texts.scheduleButton}</Button>
            </View>
          </View>

          <Block>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, alignSelf: 'center' }}>
                <Text color={Colors.theme.primary} size={15} weight="medium">
                  {i18n.texts.lastDonation}
                </Text>
                <Text
                  color={Colors.theme.text}
                  size={20}
                  weight="medium"
                  style={{ marginTop: 5 }}
                >
                  {Moment(this.state.donator.ultima_doacao).format('LL')}
                </Text>
              </View>

              {this.state.donator.canDonate && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={require('../../assets/images/goal.png')}
                    style={{ width: 31, height: 30, marginBottom: 0 }}
                  />
                  <Text size={14} color={Colors.theme.green}>
                    {i18n.texts.canDonate}
                  </Text>
                </View>
              )}
            </View>
          </Block>

          <View style={{ marginTop: 30 }}>
            <Text color={Colors.theme.text} weight="medium" size={18}>
              {i18n.texts.personalData}
            </Text>

            <Block style={{ padding: 0, marginTop: 10 }}>
              <DisplayFormData
                field={i18n.texts.personalName}
                data={this.state.donator.nome}
              />
              <DisplayFormData
                field={i18n.texts.personalAge}
                // data={Moment('30 de setembro de 1989').diff(Moment())}
                data={Moment().diff(
                  Moment(this.state.donator.data_nasc),
                  'years',
                )}
              />
              <DisplayFormData
                field={i18n.texts.personalGenre}
                data={this.state.donator.genero}
              />
              <DisplayFormData
                field={i18n.texts.personalUniqueId}
                data={this.state.donator.cpf.replace(
                  /(\d{3})(\d{3})(\d{3})(\d{2})/g,
                  '$1.$2.$3-$4',
                )}
              />

              <DisplayFormData
                field={[i18n.texts.personalState, i18n.texts.personalCity]}
                data={[this.state.donator.uf, this.state.donator.cidade]}
                styles={[{ flex: 1 }, { flex: 4 }]}
              />
            </Block>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
  },
  bloodText: {
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 52,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  profileImageContainer: {
    position: 'relative',
    paddingBottom: 0,
    paddingRight: 0,
  },
  profileImage: {
    width: getImageHeight(100, DEVICE_HEIGHT),
    height: getImageHeight(100, DEVICE_HEIGHT),
    borderRadius: getImageHeight(100, DEVICE_HEIGHT) / 2,
  },
});

export default Profile;
