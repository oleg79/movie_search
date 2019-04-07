import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Config from 'react-native-config'

import {Video, VideoCard} from '../../components/VideoCard';

import { isSuccessResponse, isFailResponse } from './helpers';

import styles from './Home.styles'

interface State {
  page: number;
  searchText: string;
  showEmptySearchWarning: boolean;
  loading: boolean;
  loadingMore: boolean;
  data: Video[];
  error: string | null;
  totalResults: number;
}

export default class Home extends React.PureComponent<{}, State> {
  state = {
    page: 1,
    searchText: '',
    showEmptySearchWarning: false,
    loading: false,
    loadingMore: false,
    data: [],
    error: null,
    totalResults: 0,
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
      this.setState({
        page: 1,
        data: [],
        loading: true,
      }, () => {
        this.search();
      });

    } else {
      this.setState({
        showEmptySearchWarning: true
      });
    }
  };

  search: () => void = async () => {
    const { page, searchText } = this.state;
    const rawResponse = await fetch(
      `${Config.API_URL}/?apikey=${Config.API_KEY}&s=${searchText.trim()}&page=${page}`
    );
    const response = await rawResponse.json();

    if (isSuccessResponse(response)) {
      this.setState(() => ({
        data: page === 1 ? response.Search : [ ...this.state.data, ...response.Search ],
        totalResults: parseInt(response.totalResults, 10),
        loading: false,
        loadingMore: false,
      }));
    } else if (isFailResponse(response)) {
      this.setState({
        error: response.Error,
        totalResults: 0,
        loading: false,
        loadingMore: false,
      });
    }

  };

  _renderItem = ({item}:{item: Video}) => <VideoCard video={item}/>;

  _keyExtractor: (item: Video) => string = (item: Video) => item.imdbID;

  _loadMoreVideos: () => void = () => {
    if (this.state.totalResults !== this.state.data.length) {
      this.setState((prevState) => ({
        page: prevState.page + 1,
        loadingMore: true,
      }), () => {
        this.search();
      });
    }
  };

  _renderListFooter = () => {
    if (!this.state.loadingMore) {
      return null;
    }

    return (
      <View>
        <ActivityIndicator animating size='large' />
      </View>
    );
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

        <Text>Videos were found: { this.state.totalResults }</Text>

        { this.state.showEmptySearchWarning &&
          <Text>Please enter the title</Text>
        }

        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          initialNumToRender={4}
          onEndReachedThreshold={0.5}
          onEndReached={this._loadMoreVideos}
          ListFooterComponent={this._renderListFooter}
        />

        { this.state.error &&
          <View>
            <Text>{ this.state.error }</Text>
          </View>
        }
      </View>
    );
  }
}
