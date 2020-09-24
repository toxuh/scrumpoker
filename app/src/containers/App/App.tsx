import React, { useCallback, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import Login from '../Login/Login';
import Room from '../Room/Room';

import useApp from './useApp';
import useStories from './useStories';
import useUsers from './useUsers';
import useVotes from './useVotes';

import './App.css';

function App() {
  const { listenReload, localUserId, socket } = useApp();
  const { getStories, listenStoriesList, stories } = useStories(socket);
  const {
    connectUser,
    currentUser,
    disconnectUser,
    listenUserRegistered,
    listenUsers,
    moderatorRole,
    registerUser,
    users,
  } = useUsers(socket);
  const {
    clearVotes,
    endVoting,
    listenEndVoting,
    listenVotes,
    summary,
    vote,
    votes,
    voteEnded,
  } = useVotes(socket);

  useEffect(() => {
    if (Boolean(localUserId.length)) {
      connectUser(localUserId);
      getStories();

      window.addEventListener('beforeunload', () =>
        disconnectUser(localUserId),
      );
    }
    return () => {
      if (Boolean(localUserId.length)) {
        window.removeEventListener('beforeunload', () =>
          disconnectUser(localUserId),
        );
      }
    };
  }, []);

  useEffect(() => {
    listenReload();
    listenUserRegistered();
    listenUsers();
    listenStoriesList();
    listenVotes();
    listenEndVoting();
  }, []);

  useHotkeys('ctrl+m', () => {
    if (Boolean(localUserId.length)) {
      moderatorRole(localUserId);
    }
  });

  const handleVote = useCallback(
    ({ storyId, points }) => {
      vote({ userId: currentUser._id, points, storyId });
    },
    [vote],
  );

  return (
    <div className="App">
      {Boolean(localUserId) ? (
        <>
          {currentUser?._id && (
            <Room
              currentUser={currentUser}
              users={users}
              votes={votes}
              stories={stories}
              voteEnded={voteEnded}
              handleVote={handleVote}
              handleEndVoting={endVoting}
              clearVotes={clearVotes}
              socket={socket}
              summary={summary}
            />
          )}
        </>
      ) : (
        <Login handleCreateUser={registerUser} />
      )}
    </div>
  );
}

export default App;
