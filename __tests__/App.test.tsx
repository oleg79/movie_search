import 'react-native';
import React from 'react';
import Config from 'react-native-config'
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<App /> component', () => {
  it('Should be rendered correctly', () => {
    renderer.create(<App />);
  });

  it('Should get env configs', () => {
    expect(Config.API_URL).toEqual('http://www.omdbapi.com');
    expect(Config.API_KEY).toEqual('59057b18');
  });
});

