import * as React from 'react';
import {
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  NavigationInjectedProps
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Feather';

import SearchParamsProvider from './src/providers/SearchParamsProvider'

import { Home, Info, Favorites } from './src/screens';
import { SearchParams } from './src/components';
import {View, Text} from "react-native";

export default class App extends React.Component<object> {
  render() {
    return (
      <SearchParamsProvider>
        <AppContainer/>
      </SearchParamsProvider>
    );
  }
}

const DrawerNavigator = createDrawerNavigator({
  Home
}, {
  drawerPosition: 'right',
  contentComponent: () => <SearchParams/>
});

const StackNavigator = createStackNavigator({
  DrawerNavigator: {
    screen: DrawerNavigator,
    navigationOptions: ({ navigation }: NavigationInjectedProps) => ({
      headerTitle: 'Movies search',
      headerRight: (
        <Icon
          name='menu'
          size={40}
          onPress={navigation.toggleDrawer}
          style={{ paddingRight: 10 }}
        />
      )
    })
  },
  Info,
});


const BottomNavigator = createBottomTabNavigator({
  Home: { screen: StackNavigator },
  Favorites,
});

const AppContainer = createAppContainer(BottomNavigator);