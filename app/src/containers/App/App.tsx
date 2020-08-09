import React, { useCallback, useEffect } from 'react';

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
    listenUsers,
    users,
  } = useUsers(socket);
  const { listenVotes, vote, votes } = useVotes(socket);

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
    listenUsers(localUserId);
    listenStoriesList();
    listenVotes();
  }, []);

  const handleVote = useCallback(
    (points) => {
      vote({ user: currentUser, points });
    },
    [vote],
  );

  return (
    <div className="App">
      {currentUser._id && (
        <Room
          currentUser={currentUser}
          users={users}
          votes={votes}
          handleVote={handleVote}
          stories={stories}
          socket={socket}
        />
      )}
    </div>
  );
}

export default App;
