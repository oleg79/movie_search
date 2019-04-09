import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Config from 'react-native-config';

import { SearchParamsContext } from '../../providers/SearchParamsProvider';
import {Video, VideoCard} from '../../components/VideoCard';

import { isSuccessResponse, isFailResponse } from './helpers';

import styles from './Home.styles'

type ScrollDirection = 'up' | 'down' | null;

interface State {
  page: number;
  searchText: string;
  showEmptySearchWarning: boolean;
  loading: boolean;
  loadingMore: boolean;
  data: Video[];
  error: string | null;
  totalResults: number;
  scrollDirection: ScrollDirection;
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
  scrollDirection: null,
};

export default class Home extends React.PureComponent<{}, State> {
  static contextType = SearchParamsContext;
  context!: React.ContextType<typeof SearchParamsContext>;

  offset: number = 0;

  state = defaultState;

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
    const { year, type, isActive } = this.context;

    let uri = `${Config.API_URL}/?apikey=${Config.API_KEY}&s=${searchText.trim()}&page=${page}`;

    if (isActive) {
      uri += `&y=${year}${type ? '&type=' + type : ''}`;
    }

    const rawResponse = await fetch(uri);
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

  renderItem = ({item}:{item: Video}) => <VideoCard video={item}/>;

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

  handleListOnScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void = ({ nativeEvent }) => {
    const currentOffset: number = nativeEvent.contentOffset.y;

    this.setState(() => ({
      scrollDirection: this.state.totalResults > 10 && (currentOffset > 400) && (currentOffset > this.offset) ? 'down' : 'up',
    }), () => {
      this.offset = currentOffset;
    });
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
        { this.state.scrollDirection !== 'down' &&
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
        }


        { Boolean(totalResults) &&
          <View style={styles.resultInfoContainer}>
            <Text style={styles.resultInfo}>
              {data.length} results of { totalResults } are loaded
            </Text>
          </View>
        }

        { showEmptySearchWarning &&
          <View>
            <Text>Please enter the title</Text>
          </View>
        }

        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          initialNumToRender={3}
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMoreVideos}
          ListFooterComponent={this.renderListFooter}
          onScroll={this.handleListOnScroll}
        />

        { error &&
          <View>
            <Text>{ error }</Text>
          </View>
        }
      </View>
    );
  }
}
