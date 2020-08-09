import React from 'react';
import { useIntl } from 'react-intl';
import { Badge, Typography, List } from 'antd';

import { UserType } from '../../../types';

import messages from './messages';

type UsersListProps = {
  isUserModerator: boolean;
  users: UserType[];
};

const { Title } = Typography;

const UsersList: React.FC<UsersListProps> = ({ isUserModerator, users }) => {
  const intl = useIntl();

  return (
    <>
      <Title level={3}>{intl.formatMessage(messages.players)}</Title>
      <List
        dataSource={users}
        renderItem={(user) => (
          <List.Item key={user._id}>
            <Badge status="default" />
            {user.name}
          </List.Item>
        )}
      />
    </>
  );
};

export default UsersList;
