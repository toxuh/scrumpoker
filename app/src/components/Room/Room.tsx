import React from 'react';
import { Layout } from 'antd';

import Buttons from './Buttons/Buttons';
import Cardboard from './Cardboard/Cardboard';
import Header from './Header/Header';
import StoriesList from './StoriesList/StoriesList';
import UsersList from './UsersList/UsersList';

import { StoryType, UserType } from '../../types';

import './Room.css';

type RoomProps = {
  activeStory?: StoryType;
  currentUser: UserType;
  users: UserType[];
  votes: string[];
  handleVote: ({}) => void;
  stories: StoryType[];
  handleAddTask: (task: { name: string; description: string }) => void;
  handleRemoveTask: (taskId: string) => void;
};

const { Content, Sider } = Layout;

const Room: React.FC<RoomProps> = ({
  activeStory,
  currentUser,
  users,
  votes,
  handleVote,
  stories,
  handleAddTask,
  handleRemoveTask,
}) => {
  const isUserModerator = currentUser.role === 'moderator';

  return (
    <Layout>
      <Header title="Hello!" />
      <Layout className="Room__Layout">
        <Content className="Room__Content">
          <Cardboard
            storyTitle={activeStory?.name}
            handleVote={(points) =>
              handleVote({
                storyId: activeStory?._id,
                points,
              })
            }
          />
          <StoriesList
            stories={stories}
            handleAddStory={handleAddTask}
            handleRemoveStory={handleRemoveTask}
          />
        </Content>
        <Sider theme="light" className="Room__Sidebar" width={350}>
          <UsersList
            votes={votes}
            isUserModerator={isUserModerator}
            users={users}
          />
          {isUserModerator && <Buttons />}
        </Sider>
      </Layout>
    </Layout>
  );
};

export default Room;
