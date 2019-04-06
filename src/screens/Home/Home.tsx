import * as React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Config from 'react-native-config'

import styles from './Home.styles'

interface SuccessResponse {
  Response: string;
  Search: Object[];
  totalResults: string;
}

interface FailResponse {
  Response: string;
  Error: string;
}

type Response = SuccessResponse | FailResponse | null;

interface State {
  searchText: string;
  showEmptySearchWarning: boolean;
  searching: boolean;
  response: Response;
}

export default class Home extends React.PureComponent<{}, State> {
  state = {
    searchText: '',
    showEmptySearchWarning: false,
    searching: false,
    response: null,
  };

  handleSearchTextChange: (searchText: string) => void = searchText => {
    this.setState({
      searchText,
      showEmptySearchWarning: false
    });
  };

  handleSearchPress: () => void = () => {
    const searchText = this.state.searchText.trim();

    if (searchText) {
      this.search(searchText);
    } else {
      this.setState({
        showEmptySearchWarning: true
      });
    }
  };

  search: (searchText: string) => void = async searchText => {
    const rawResponse = await fetch(`${Config.API_URL}/?apikey=${Config.API_KEY}&s=${searchText}`);
    const response = await rawResponse.json();
    this.setState({ response })
  };

  render() {
    return (
      <View style={styles.root}>
        <TextInput
          placeholder='Enter movie title'
          onChangeText={this.handleSearchTextChange}
        />
        <TouchableOpacity onPress={this.handleSearchPress}>
          <Text>Search</Text>
        </TouchableOpacity>

        { this.state.showEmptySearchWarning &&
          <Text>Please enter the title</Text>
        }
      </View>
    );
  }
}
