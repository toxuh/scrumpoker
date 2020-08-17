import React, { useCallback, useEffect } from 'react';

import Login from '../Login/Login';
import Room from '../Room/Room';

import useApp from './useApp';
import useStories from './useStories';
import useUsers from './useUsers';
import useVotes from './useVotes';

import './App.css';

function App() {
  const { localUserId, socket } = useApp();
  const { getStories, listenStoriesList, stories } = useStories(socket);
  const {
    connectUser,
    currentUser,
    disconnectUser,
    listenUserRegistered,
    listenUsers,
    registerUser,
    users,
  } = useUsers(socket);
  const {
    clearVotes,
    listenEndVoting,
    listenVotes,
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
    listenUserRegistered();
    listenUsers(localUserId);
    listenStoriesList();
    listenVotes();
    listenEndVoting();
  }, []);

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
              clearVotes={clearVotes}
              socket={socket}
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
