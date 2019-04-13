import * as React from 'react'
import { View, Text } from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Feather';

import SearchParamsProvider from './src/providers/SearchParamsProvider'

import { Home, Info } from './src/screens';
import { SearchParams } from './src/components';

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
    navigationOptions: {
      headerTitle: 'Movies search',
    }
  },
  Info,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerRight: (
      <Icon
        name='menu'
        size={40}
        onPress={navigation.toggleDrawer}
        style={{ paddingRight: 10 }}
      />
    )
  }),
});

const AppContainer = createAppContainer(StackNavigator);