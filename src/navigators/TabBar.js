import React, { Component } from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";

class TabBar extends Component {
  navigationStateIndex = null;

  // call when each time user click different tab
  navigationAvaliableFuncs = {};

  // call when clicking tab got refused
  navigationRefusedFuncs = {};

  constructor(props) {
    super(props);
  }

  // Main function to render tabbar
  renderTabBarButton(route, idx) {
    const {
      activeTintColor,
      inactiveTintColor,
      navigation,
      getLabelText,
      renderIcon,
    } = this.props;
    const currentIndex = navigation.state.index;
    const color = currentIndex === idx ? activeTintColor : inactiveTintColor;
    const label = getLabelText({
      route,
      focused: currentIndex === idx,
      index: idx,
    });
    return (
      <TouchableOpacity
        onPress={() => {
          if (currentIndex != idx) {
            if (this.isNavigateAvaliable(label)) {
              navigation.navigate(route.routeName);
            } else {
              this._onNavigationRefused(label);
            }
          }
        }}
        style={{ backgroundColor: "lightgreen" }}
        key={route.routeName}
      >
        {renderIcon({
          route,
          tintColor: color,
          focused: currentIndex === idx,
          index: idx,
        })}
        {/* <Text style={[ StdStyles.tabBarButtonText, { color }]}>
                    {label}
                </Text>  */}
      </TouchableOpacity>
    );
  }

  isNavigateAvaliable(label) {
    const func = this.navigationAvaliableFuncs[label];
    if (func) {
      return func();
    }
    return true;
  }

  _onNavigationRefused(label) {
    const func = this.navigationRefusedFuncs[label];
    if (func) {
      func();
    }
  }

  render() {
    const { navigation, style } = this.props;
    const tabBarButtons = navigation.state.routes.map(
      this.renderTabBarButton.bind(this),
    );
    return (
      <View
        style={[
          {
            width: Dimensions.get("window").width - 40,
            height: 72,
            position: "absolute",
            left: 20,
            bottom: 40,
            backgroundColor: "white",
          },
          style,
        ]}
      >
        {tabBarButtons}
      </View>
    );
  }
}

export default TabBar;
