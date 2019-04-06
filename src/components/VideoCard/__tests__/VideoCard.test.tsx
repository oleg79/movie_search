import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import VideoCard from '../VideoCard';
import { Video } from '../types';

const video: Video = {
  Poster: "https://m.media-amazon.com/images/M/MV5BMjMxMTQ3MzMwMV5BMl5BanBnXkFtZTgwNTYxNzYxMTE@._V1_SX300.jpg",
  Title: "Cool Runnings",
  Type: "movie",
  Year: "1993",
  imdbID: "tt0106611",
};

describe('<VideoCard /> component', () => {

  it('Should be rendered properly', () => {
    const rendered = renderer.create(<VideoCard video={video}/>);
    const tree = rendered.toJSON();

    expect(tree).toMatchSnapshot();
  });

});
