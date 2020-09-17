import React, { useCallback, useState } from 'react';
import { Layout } from 'antd';

import Buttons from './Buttons/Buttons';
import Cardboard from './Cardboard/Cardboard';
import StoriesList from './StoriesList/StoriesList';
import UsersList from './UsersList/UsersList';

import { StoryType, UserType, VoteType } from '../../types';

import './Room.css';

type RoomProps = {
  activeStory?: StoryType;
  currentUser: UserType;
  users: UserType[];
  votes: VoteType[];
  voteEnded: boolean;
  handleVote: ({}) => void;
  stories: StoryType[];
  summary: number;
  handleAddTask: (task: { name: string; description: string }) => void;
  handleRemoveTask: (taskId: string) => void;
  handleSkipStory: (taskId: string | undefined) => void;
  handleClearVotes: ({}) => void;
  handleEndVoting: (sum: { taskId: string; points: number }) => void;
};

const { Content, Sider } = Layout;

const Room: React.FC<RoomProps> = ({
  activeStory,
  currentUser,
  users,
  votes,
  voteEnded,
  handleVote,
  stories,
  summary,
  handleAddTask,
  handleRemoveTask,
  handleClearVotes,
  handleSkipStory,
  handleEndVoting,
}) => {
  const isUserModerator = currentUser.role === 'moderator';

  const [userVote, setUserVote] = useState<string | boolean>(false);

  const onCardClick = useCallback(
    (vote) => {
      if (Boolean(activeStory) && !voteEnded) {
        handleVote(vote);
        setUserVote(vote.points);
      }
    },
    [userVote, handleVote, setUserVote, activeStory],
  );

  const onClearVotes = () => {
    handleClearVotes({ storyId: activeStory?._id });
    setUserVote(false);
  };

  return (
    <Layout className="Room__Layout">
      <Content className="Room__Content">
        <Cardboard
          storyTitle={activeStory?.name}
          isActive={Boolean(activeStory)}
          userVote={userVote}
          onCardClick={(point) =>
            onCardClick({
              storyId: activeStory?._id,
              points: point,
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
          voteEnded={voteEnded}
          isUserModerator={isUserModerator}
          users={users}
        />
        {isUserModerator && (
          <Buttons
            activeStory={activeStory}
            voteEnded={voteEnded}
            noVotes={Boolean(votes.length)}
            handleClearVotes={onClearVotes}
            handleSkipStory={handleSkipStory}
            handleEndVoting={handleEndVoting}
            summary={summary}
          />
        )}
      </Sider>
    </Layout>
  );
};

export default Room;
