import * as React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { Video } from './types';

// @ts-ignore
import NAImage from '../../images/not_available.png';

import styles from './VideoCard.styles';
import { NavigationInjectedProps } from 'react-navigation';

interface Props {
  video: Video;
}

export default class VideoCard extends React.PureComponent<Props & NavigationInjectedProps> {

  navigateToMovieInfo: () => void = () => {
    this.props.navigation.navigate(
      'Info',
      {
        title: this.props.video.Title,
        imdbId: this.props.video.imdbID,
      }
    );
  };

  render() {
    const {
      Title,
      Year,
      Type,
      Poster,
    } = this.props.video;

    const imageSource = Poster === 'N/A' ? NAImage : { uri: Poster };

    return (
      <View style={styles.card}>
        <View>
          <Image
            style={styles.poster}
            source={imageSource}
            defaultSource={NAImage}
          />
        </View>

        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.label}>title:</Text>
            <Text style={styles.title}>{ Title }</Text>
          </View>

          <View>
            <Text style={styles.label}>year:</Text>
            <Text>{ Year }</Text>
          </View>

          <View>
            <Text style={styles.label}>type:</Text>
            <Text style={styles.type}>{ Type }</Text>
          </View>

          <TouchableOpacity onPress={this.navigateToMovieInfo}>
            <Text>More info</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
