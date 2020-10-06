import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { Badge, Typography, List, Progress, Tag } from 'antd';
import { CrownTwoTone } from '@ant-design/icons';

import { UserType, VoteType } from '../../types';

import messages from './messages';

import './UsersList.css';

export type UsersListProps = {
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

  const voteProgress = (votes.length / users.length) * 100;

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
            {user.role === 'moderator' && (
              <CrownTwoTone twoToneColor="#daac50" />
            )}
            {voteEnded &&
              votes.map(
                (vote): ReactNode => {
                  if (vote.userId === user._id) {
                    return (
                      <Tag color="#87d068" key={vote.userId}>
                        {vote.points}
                      </Tag>
                    );
                  }

                  return null;
                },
              )}
          </List.Item>
        )}
      />
      <Progress percent={voteProgress} showInfo={false} />
    </>
  );
};

export default UsersList;
