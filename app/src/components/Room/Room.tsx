import React, { useCallback, useState } from 'react';
import { Layout } from 'antd';

import Buttons from '../Buttons/Buttons';
import Cardboard from '../Cardboard/Cardboard';
import StoriesList from '../StoriesList/StoriesList';
import UsersList from '../UsersList/UsersList';

import useStories from '../../containers/Room/useStories';
import useVotes from '../../containers/App/useVotes';

import { StoryType, UserType } from '../../types';

import './Room.css';

type RoomProps = {
  currentStory?: StoryType;
  currentUser: UserType;
  users: UserType[];
  allStories: StoryType[];
  activeStories: StoryType[];
  closedStories: StoryType[];
};

const { Content, Sider } = Layout;

const Room: React.FC<RoomProps> = ({
  currentStory,
  currentUser,
  users,
  allStories,
  activeStories,
  closedStories,
}) => {
  const { addStory, removeStory, skipStory } = useStories();
  const {
    clearVotes,
    endVoting,
    summary,
    vote,
    votes,
    votingEnded,
  } = useVotes();

  const isUserModerator = currentUser.role === 'moderator';

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
          isUserModerator={isUserModerator}
          users={users}
        />
        {isUserModerator && (
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
