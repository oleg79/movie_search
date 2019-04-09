import * as React from 'react'
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Feather';

import SearchParamsProvider from './src/providers/SearchParamsProvider'

import { Home } from './src/screens';
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
  DrawerNavigator
}, {
  defaultNavigationOptions: ({ navigation }) => ({
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
});

const AppContainer = createAppContainer(StackNavigator);