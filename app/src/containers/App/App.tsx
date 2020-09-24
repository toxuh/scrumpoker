import React, { useCallback, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { Loading } from '../../components';
import Login from '../Login/Login';
import Room from '../Room/Room';

import useApp from './useApp';
import useAuth from './useAuth';
import useStories from './useStories';
import useUsers from './useUsers';
import useVotes from './useVotes';

import './App.css';

function App() {
  const { isLoading, listenReload, localUserId, setLoading, socket } = useApp();
  const { currentUser, listenUserRegistered, registerUser } = useAuth(socket);
  const { getStories, listenStoriesList, stories } = useStories(socket);
  const {
    connectUser,
    disconnectUser,
    listenUsers,
    moderatorRole,
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
    if (localUserId) {
      connectUser(localUserId);
      getStories();

      window.addEventListener('beforeunload', () => {
        setLoading();
        disconnectUser(localUserId);
      });
    }
    return () => {
      if (localUserId) {
        window.removeEventListener('beforeunload', () => {
          setLoading();
          disconnectUser(localUserId);
        });
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
    if (localUserId) {
      moderatorRole(localUserId);
    }
  });

  const handleVote = useCallback(
    ({ storyId, points }) => {
      vote({ userId: currentUser._id, points, storyId });
    },
    [vote],
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login handleCreateUser={registerUser} />;
  }

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
