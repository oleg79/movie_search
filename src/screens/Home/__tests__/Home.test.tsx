import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import successResponse from '../__mocks__/successResponse.json';
import failResponse from '../__mocks__/failResponse.json';

import Home, { defaultState } from '../';

const generateFetch = (rawJsonResponse: string) => {
  // @ts-ignore
  global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        Id: '123',
        json: function() {
          return Promise.resolve(JSON.parse(rawJsonResponse));
        }
      });
    });
  });
};

describe('<Home/> component', () => {
  let rendered: any;
  let instance: any;

  beforeEach(() => {
    rendered = renderer.create(<Home/>);
    instance = rendered.getInstance();
  });


  it('Should be rendered properly', () => {
    const tree = rendered.toJSON();

    expect(tree).toMatchSnapshot();
  });


  it('Should have a proper initial state', () => {
    expect(instance.state).toMatchObject(defaultState);
  });


  it('Should handle text change', () => {
    instance.handleSearchTextChange('moon');
    expect(instance.state.searchText).toBe('moon');
  });


  it('Should handle empty keyword search properly', () => {
    instance.handleSearchPress();
    expect(instance.state.showEmptySearchWarning).toBe(true);

    instance.handleSearchTextChange('    ');
    expect(instance.state.showEmptySearchWarning).toBe(false);

    instance.handleSearchPress();
    expect(instance.state.showEmptySearchWarning).toBe(true);
  });


  it('Should handle successful keyword search properly', async () => {
    generateFetch(JSON.stringify(successResponse));
    instance.handleSearchTextChange('some text');

    await (async () => {
      instance.handleSearchPress();
      expect(instance.state.loading).toBe(true);
    })();


    expect(instance.state.data).toMatchObject(successResponse.Search);
    expect(instance.state.loading).toBe(false);
  });


  it('Should handle failed keyword search properly', async () => {
    generateFetch(JSON.stringify(failResponse));
    instance.handleSearchTextChange('some text');

    await (async () => {
      instance.handleSearchPress();
      expect(instance.state.loading).toBe(true);
    })();

    expect(instance.state.error).toBeTruthy();
    expect(instance.state.loading).toBe(false);
  });


  it('Should load more videos properly', async () => {
    generateFetch(JSON.stringify(successResponse));
    instance.handleSearchTextChange('some text');

    await instance.search();

    expect(instance.state.data.length).toBe(2);
    expect(instance.state.totalResults).toBe(4);

    await (async () => {
      instance.loadMoreVideos();
      expect(instance.state.page).toBe(2);
    })();

    expect(instance.state.data.length).toBe(4);

    await (async () => {
      instance.loadMoreVideos();
      expect(instance.state.page).toBe(2);
    })();
  });

});
