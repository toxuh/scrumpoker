import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

jest.mock('react-hotkeys-hook', () => ({
  useHotkeys: () => jest.fn(),
}));

jest.mock('./useApp', () => () => ({
  bootstrap: () => jest.fn(),
  isLoading: false,
  listenReload: () => jest.fn(),
  localUserId: '1q2w3e4r',
}));

jest.mock('./useAuth', () => () => ({
  currentUser: {},
  listenUserRegistered: () => jest.fn(),
  registerUser: () => jest.fn(),
}));

jest.mock('./useStories', () => () => ({
  getStories: () => jest.fn(),
  listenStoriesList: () => jest.fn(),
}));

jest.mock('./useUsers', () => () => ({
  connectUser: () => jest.fn(),
  disconnectUser: () => jest.fn(),
  listenUsers: () => jest.fn(),
  moderatorRole: () => jest.fn(),
}));

jest.mock('./useVotes', () => () => ({
  listenEndVoting: () => jest.fn(),
  listenVotes: () => jest.fn(),
  summary: 0,
}));

describe(`containers/App/App`, () => {
  it('renders', () => {
    expect.assertions(1);

    const wrapper = shallow(<App />);

    expect(wrapper).toMatchInlineSnapshot(`
      <div
        className="App"
      >
        <Room
          currentUser={Object {}}
          summary={0}
        />
      </div>
    `);
  });
});
