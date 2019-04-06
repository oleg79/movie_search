import * as React from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Config from 'react-native-config'

import {Video, VideoCard} from '../../components/VideoCard';

import { ApiResponse } from './types';
import { isSuccessResponse, isFailResponse } from './helpers';

import styles from './Home.styles'

interface State {
  searchText: string;
  showEmptySearchWarning: boolean;
  searching: boolean;
  response: ApiResponse;
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
    console.log(response);
    this.setState({ response })
  };

  _renderItem = ({item}:{item: Video}) => <VideoCard video={item}/>;

  _keyExtractor: (item: Video) => string = (item: Video) => item.imdbID;

  render() {

    const { response } = this.state;

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

        { isSuccessResponse(this.state.response) &&
          <FlatList
            // @ts-ignore
            data={response.Search}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            initialNumToRender={4}
          />
        }

        { isFailResponse(response) &&
          <View>
            <Text>{ response.Error }</Text>
          </View>
        }
      </View>
    );
  }
}
