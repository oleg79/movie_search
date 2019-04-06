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
      <View>
        <Text>{ Title }</Text>
        <Image
          style={{
            width: 200,
            height: 200,
            resizeMode: 'contain'
          }}
          source={imageSource}
          defaultSource={NAImage}
        />
        <Text>{ Year }</Text>
        <Text>{ Type }</Text>
      </View>
    );
  }
}
