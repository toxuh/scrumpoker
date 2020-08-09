import React from 'react';
import { Layout } from 'antd';

import Buttons from './Buttons/Buttons';
import Cardboard from './Cardboard/Cardboard';
import Header from './Header';
import StoriesList from './StoriesList/StoriesList';
import UsersList from './UsersList/UsersList';

import { StoryType, UserType } from '../../types';

import './Room.css';

type RoomProps = {
  currentUser: UserType;
  users: UserType[];
  stories: StoryType[];
  handleAddTask: (task: { name: string; description: string }) => void;
  handleRemoveTask: (taskId: string) => void;
};

const { Content, Footer, Sider } = Layout;

const Room: React.FC<RoomProps> = ({
  currentUser,
  users,
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
          <Cardboard />
          <StoriesList
            stories={stories}
            handleAddStory={handleAddTask}
            handleRemoveStory={handleRemoveTask}
          />
        </Content>
        <Sider theme="light" className="Room__Sidebar" width={350}>
          <UsersList isUserModerator={isUserModerator} users={users} />
          {isUserModerator && <Buttons />}
        </Sider>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Footer</Footer>
    </Layout>
  );
};

export default Room;
