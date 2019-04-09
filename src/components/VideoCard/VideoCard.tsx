import * as React from 'react'
import {
  View,
  Text,
  Image
} from 'react-native';
import { Video } from './types';

// @ts-ignore
import NAImage from '../../images/not_available.png';

import styles from './VideoCard.styles';

interface Props {
  video: Video;
}

export default class VideoCard extends React.PureComponent<Props> {
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
        </View>
      </View>
    );
  }
}
