import React from 'react';
import { shallow } from 'enzyme';

import Room, { RoomProps } from './Room';

const props: RoomProps = {
  currentUser: {
    _id: '1',
    name: 'User',
    role: 'user',
  },
  summary: 0,
};

jest.mock('./useJira', () => () => ({
  epicsList: [],
  getJiraEpics: () => jest.fn(),
  getJiraStories: () => jest.fn(),
  listenJiraEpics: () => jest.fn(),
}));

jest.mock('./useVotes', () => () => ({
  clearVotes: () => jest.fn(),
  endVoting: () => jest.fn(),
  setUserVote: () => jest.fn(),
  userVote: '2',
  vote: () => jest.fn(),
  votes: [],
  votingEnded: false,
}));

jest.mock('./useStories', () => () => ({
  allStories: [],
  activeStories: [],
  closedStories: [],
  currentStory: {},
  addStory: () => jest.fn(),
  removeStory: () => jest.fn(),
  skipStory: () => jest.fn(),
}));

jest.mock('./useUsers', () => () => ({
  isCurrentUserModerator: true,
  users: [],
}));

describe('containers/Room/Room', () => {
  it('renders', () => {
    expect.assertions(1);

    const wrapper = shallow(<Room {...props} />);

    expect(wrapper).toMatchInlineSnapshot(`
      <Layout
        className="Room__Layout"
      >
        <Content
          className="Room__Content"
        >
          <Cardboard
            currentStory={Object {}}
            isActive={true}
            onCardClick={[Function]}
            userVote="2"
          />
          <StoriesList
            activeStories={Array []}
            allStories={Array []}
            closedStories={Array []}
            epicsList={Array []}
            handleAddStory={[Function]}
            handleGetEpics={[Function]}
            handleGetStories={[Function]}
            handleRemoveStory={[Function]}
            isUserModerator={true}
          />
        </Content>
        <Sider
          className="Room__Sidebar"
          theme="light"
          width={350}
        >
          <UsersList
            isUserModerator={true}
            users={Array []}
            voteEnded={false}
            votes={Array []}
          />
          <Buttons
            activeStory={Object {}}
            handleClearVotes={[Function]}
            handleEndVoting={[Function]}
            handleSkipStory={[Function]}
            noVotes={false}
            summary={0}
            voteEnded={false}
          />
        </Sider>
      </Layout>
    `);
  });
});
