import React, { useCallback, useState } from 'react';
import { Layout } from 'antd';

import Buttons from './Buttons/Buttons';
import Cardboard from './Cardboard/Cardboard';
import StoriesList from './StoriesList/StoriesList';
import UsersList from './UsersList/UsersList';

import useStories from '../../containers/App/useStories';
import useVotes from '../../containers/App/useVotes';

import { StoryType, UserType } from '../../types';

import './Room.css';

type RoomProps = {
  activeStory?: StoryType;
  currentUser: UserType;
  users: UserType[];
  stories: StoryType[];
};

const { Content, Sider } = Layout;

const Room: React.FC<RoomProps> = ({
  activeStory,
  currentUser,
  users,
  stories,
}) => {
  const { addStory, removeStory, skipStory } = useStories();
  const { clearVotes, endVoting, summary, vote, votes, voteEnded } = useVotes();

  const isUserModerator = currentUser.role === 'moderator';

  const [userVote, setUserVote] = useState<string | boolean>(false);

  const handleVote = useCallback(
    ({ storyId, points }) => {
      vote({ userId: currentUser._id, points, storyId });
    },
    [vote],
  );

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
    clearVotes({ storyId: activeStory?._id });
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
          handleAddStory={addStory}
          handleRemoveStory={removeStory}
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
