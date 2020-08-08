import React from 'react';
import { useIntl } from 'react-intl';
import { Typography, List } from 'antd';

import { UserResponseType } from '../../../types';

import messages from './messages';

type UsersListProps = {
  currentUser: UserResponseType;
  users: UserResponseType[];
};

const { Title } = Typography;

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const intl = useIntl();

  return (
    <>
      <Title level={3}>{intl.formatMessage(messages.players)}</Title>
      <List
        dataSource={users}
        renderItem={(user) => <List.Item key={user._id}>{user.name}</List.Item>}
      />
    </>
  );
};

export default UsersList;
