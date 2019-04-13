import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Config from 'react-native-config';
import {NavigationInjectedProps} from 'react-navigation';

import axios from 'axios';
import { SearchParamsContext } from '../../providers/SearchParamsProvider';

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

export const defaultState: State = {
  page: 1,
  searchText: '',
  showEmptySearchWarning: false,
  loading: false,
  loadingMore: false,
  data: [],
  error: null,
  totalResults: 0,
};

export default class Home extends React.PureComponent<NavigationInjectedProps, State> {
  static contextType = SearchParamsContext;
  context!: React.ContextType<typeof SearchParamsContext>;

  offset: number = 0;

  state = defaultState;

  handleSearchTextChange: (searchText: string) => void = searchText => {
    this.setState({
      searchText,
      showEmptySearchWarning: false,
      error: null,
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
    const { year, type, isActive } = this.context;

    let uri = `${Config.API_URL}/?apikey=${Config.API_KEY}&s=${searchText.trim()}&page=${page}`;

    if (isActive) {
      uri += `&y=${year}${type ? '&type=' + type : ''}`;
    }

    try {
      const { data: response } = await axios.get(uri);
      if (isSuccessResponse(response)) {
        this.setState(() => ({
          data: page === 1 ? response.Search : [ ...this.state.data, ...response.Search ],
          totalResults: parseInt(response.totalResults, 10),
          loading: false,
          loadingMore: false,
          error: null,
        }));
      } else if (isFailResponse(response)) {
        this.setState({
          error: response.Error,
          totalResults: 0,
          loading: false,
          loadingMore: false,
        });
      }
    } catch (e) {
      this.setState({ error: e.message });
    }

  };

  renderItem = ({item}:{item: Video}) => <VideoCard video={item} navigation={this.props.navigation}/>;

  keyExtractor: (item: Video) => string = (item: Video) => item.imdbID;

  loadMoreVideos: () => void = () => {
    if (this.state.totalResults !== this.state.data.length) {
      this.setState((prevState) => ({
        page: prevState.page + 1,
        loadingMore: true,
      }), () => {
        this.search();
      });
    }
  };

  renderListFooter = () => {
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
    const {
      totalResults,
      data,
      showEmptySearchWarning,
      error,
    } = this.state;

    return (
      <View style={styles.root}>
        <View>
          <TextInput
            placeholder='Enter movie title'
            onChangeText={this.handleSearchTextChange}
            value={this.state.searchText}
            style={styles.search}
          />
          <TouchableOpacity onPress={this.handleSearchPress}>
            <Text style={styles.searchButton}>Search</Text>
          </TouchableOpacity>
        </View>


        { Boolean(totalResults) &&
          <View style={styles.resultInfoContainer}>
            <Text style={styles.resultInfo}>
              {data.length} results of { totalResults } are loaded
            </Text>
          </View>
        }

        { showEmptySearchWarning &&
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Please enter a title</Text>
          </View>
        }

        {!error &&
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            initialNumToRender={3}
            onEndReachedThreshold={0.5}
            onEndReached={this.loadMoreVideos}
            ListFooterComponent={this.renderListFooter}
          />
        }

        { error &&
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{ error }</Text>
          </View>
        }
      </View>
    );
  }
}
