import React from 'react';
import { Layout } from 'antd';

import Buttons from './Buttons';
import Cardboard from './Cardboard/Cardboard';
import Header from './Header';
import StoriesList from './StoriesList/StoriesList';
import UsersList from './UsersList/UsersList';

import { StoryType, UserType } from '../../types';

import './Room.css';

type RoomProps = {
  users: UserType[];
  stories: StoryType[];
  handleAddTask: (task: { name: string; description: string }) => void;
  handleRemoveTask: (taskId: string) => void;
};

const { Content, Footer, Sider } = Layout;

const Room: React.FC<RoomProps> = ({
  users,
  stories,
  handleAddTask,
  handleRemoveTask,
}) => {
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
          <UsersList users={users} />
          <Buttons />
        </Sider>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Footer</Footer>
    </Layout>
  );
};

export default Room;
