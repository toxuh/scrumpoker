import React from 'react';
import { useIntl } from 'react-intl';
import { Badge, Typography, List, Tag } from 'antd';

import { UserType, VoteType } from '../../../types';

import messages from './messages';

import './UsersList.css';

type UsersListProps = {
  isUserModerator: boolean;
  users: UserType[];
  votes: VoteType[];
  voteEnded: boolean;
};

const { Title } = Typography;

const UsersList: React.FC<UsersListProps> = ({
  isUserModerator,
  users,
  votes,
  voteEnded,
}) => {
  const intl = useIntl();

  return (
    <>
      <Title level={3}>{intl.formatMessage(messages.players)}</Title>
      <List
        className="UsersList"
        dataSource={users}
        renderItem={(user) => (
          <List.Item key={user._id}>
            <Badge
              status={
                Boolean(votes.filter((vote) => vote.userId === user._id).length)
                  ? 'processing'
                  : 'default'
              }
            />
            {user.name}
            {voteEnded &&
              votes.map((vote) => {
                if (vote.userId === user._id) {
                  return (
                    <Tag color="#87d068" key={vote.userId}>
                      {vote.points}
                    </Tag>
                  );
                }
              })}
          </List.Item>
        )}
      />
    </>
  );
};

export default UsersList;
