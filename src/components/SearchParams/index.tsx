import * as React from 'react'
import {
  Switch,
  TouchableOpacity,
  SafeAreaView,
  View,
  Text
} from 'react-native';
import Slider from '@react-native-community/slider';
import { SearchParamsContext, SearchParamsContextValue } from '../../providers/SearchParamsProvider';
import {VideoType} from '../VideoCard';
import styles from './SearchParams.styles';

interface State {
  slideValue: number,
  test: boolean,
}

export default class SearchParams extends React.PureComponent<object, State> {
  static contextType = SearchParamsContext;
  context!: React.ContextType<typeof SearchParamsContext>;

  constructor(props: object, context: SearchParamsContextValue) {
    super(props);

    this.state = { slideValue: context.year, test: true };

    this.toggleMovieType = this.getTypeToggler('movie');
    this.toggleSeriesType = this.getTypeToggler('series');
    this.toggleEpisodeType = this.getTypeToggler('episode');
  }

  toggleMovieType: () => void;
  toggleSeriesType: () => void;
  toggleEpisodeType: () => void;

  handleValueChange: (slideValue: number) => void = slideValue => this.setState({ slideValue });

  getTypeToggler: (type: VideoType) => () => void =
      type => () => this.context.setType(this.context.type === type ? null : type);

  getButtonStyles: (type: VideoType) => object = type => {
    return type === this.context.type ? styles.buttonSelected : styles.button;
  };

  render() {
    return(
      <SafeAreaView style={styles.root}>

        <Text style={styles.title}>Search Parameters</Text>

        <View style={styles.container}>
          <TouchableOpacity onPress={this.toggleMovieType}>
            <Text style={this.getButtonStyles('movie')}>movie</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.toggleSeriesType}>
            <Text style={this.getButtonStyles('series')}>series</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.toggleEpisodeType}>
            <Text style={this.getButtonStyles('episode')}>episode</Text>
          </TouchableOpacity>

        </View>

        <View>
          <Text style={styles.slideValue}>{ this.state.slideValue }</Text>
          <Slider
            style={styles.slide}
            minimumValue={1902}
            maximumValue={2019}
            step={1}
            value={this.context.year}
            onSlidingComplete={year => this.context.setYear(year)}
            onValueChange={this.handleValueChange}
            minimumTrackTintColor="#e53935"
            maximumTrackTintColor="#e53935"
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.filterLabel}>Use filter:</Text>
          <Switch
            value={this.context.isActive}
            onValueChange={this.context.toggleActive}
            trackColor={{ false: '#b8b8b8', true: '#e53935' }}
            style={{ alignSelf: 'center' }}
          />
        </View>

      </SafeAreaView>
    );
  }
}
