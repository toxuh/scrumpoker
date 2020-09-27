import React, { useCallback, useState } from 'react';
import { Layout } from 'antd';

import useStories from './useStories';
import useUsers from './useUsers';

import useVotes from '../../containers/App/useVotes';

import { Buttons, Cardboard, StoriesList, UsersList } from '../../components';

import './Room.css';

const { Content, Sider } = Layout;

const Room: React.FC = () => {
  const {
    clearVotes,
    endVoting,
    summary,
    vote,
    votes,
    votingEnded,
  } = useVotes();

  const {
    allStories,
    activeStories,
    closedStories,
    currentStory,
    addStory,
    removeStory,
    skipStory,
  } = useStories();
  const { currentUser, isCurrentUserModerator, users } = useUsers();

  const [userVote, setUserVote] = useState<string | boolean>(false);

  const handleVote = useCallback(
    ({ storyId, points }) => {
      vote({ userId: currentUser._id, points, storyId });
    },
    [currentUser._id, vote],
  );

  const onCardClick = useCallback(
    (vote) => {
      if (Boolean(currentStory) && !votingEnded) {
        handleVote(vote);
        setUserVote(vote.points);
      }
    },
    [handleVote, setUserVote, currentStory, votingEnded],
  );

  const onClearVotes = () => {
    clearVotes({ storyId: currentStory?._id });
    setUserVote(false);
  };

  return (
    <Layout className="Room__Layout">
      <Content className="Room__Content">
        <Cardboard
          storyTitle={currentStory?.name}
          isActive={Boolean(currentStory)}
          userVote={userVote}
          onCardClick={(point) =>
            onCardClick({
              storyId: currentStory?._id,
              points: point,
            })
          }
        />
        <StoriesList
          allStories={allStories}
          activeStories={activeStories}
          closedStories={closedStories}
          handleAddStory={addStory}
          handleRemoveStory={removeStory}
        />
      </Content>
      <Sider theme="light" className="Room__Sidebar" width={350}>
        <UsersList
          votes={votes}
          voteEnded={votingEnded}
          isUserModerator={isCurrentUserModerator}
          users={users}
        />
        {isCurrentUserModerator && (
          <Buttons
            activeStory={currentStory}
            voteEnded={votingEnded}
            noVotes={Boolean(votes.length)}
            handleClearVotes={onClearVotes}
            handleSkipStory={skipStory}
            handleEndVoting={endVoting}
            summary={summary}
          />
        )}
      </Sider>
    </Layout>
  );
};

export default Room;
