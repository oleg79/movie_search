import * as React from 'react';
import {
  Image,
  ScrollView,
  Text,
  View
} from 'react-native';
import {NavigationInjectedProps, NavigationScreenProps} from 'react-navigation';
import Config from 'react-native-config';
import axios from 'axios';

// @ts-ignore
import NAImage from '../../images/not_available.png';

interface VideoData {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Array<{ Source: string, Value: string }>;
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

interface State {
  data: VideoData | null;
}

const isVideoData = (data: VideoData | null): data is VideoData => data !== null;

export default class Info extends React.PureComponent<NavigationInjectedProps, State>{
  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    title: navigation.getParam('title')
  });

  state = { data: null };

  async componentDidMount() {
    const id = this.props.navigation.getParam('imdbId');
    const response = await axios.get(`${Config.API_URL}/?apikey=${Config.API_KEY}&i=${id}`);

    this.setState({
      data: response.data
    });
  }

  render() {
    const { data } = this.state;
    return isVideoData(data) ? (
      <ScrollView>
        <Image
          source={{ uri: data.Poster }}
          defaultSource={NAImage}
          style={{
            width: 200,
            height: 300,
          }}
        />
        <View>
          <Text>Actors:</Text>
          <Text>{ data.Actors }</Text>
        </View>

        <View>
          <Text>Director:</Text>
          <Text>{ data.Director }</Text>
        </View>

        <View>
          <Text>Imdb rating:</Text>
          <Text>{ data.imdbRating }</Text>
        </View>

        <View>
          <Text>Plot:</Text>
          <Text>{ data.Plot }</Text>
        </View>
      </ScrollView>
    ): null;
  }
}
