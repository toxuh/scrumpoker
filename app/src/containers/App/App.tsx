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
    listenEndVoting,
    listenVotes,
    summary,
    vote,
    votes,
    voteEnded,
  } = useVotes(socket);

  const onCloseApp = () => {
    setLoading();
    disconnectUser(localUserId);
    socket.disconnect();
  };

  useEffect(() => {
    if (localUserId) {
      connectUser(localUserId);
      getStories();

      window.addEventListener('beforeunload', onCloseApp);
    }
    return () => {
      if (localUserId) {
        window.removeEventListener('beforeunload', onCloseApp);
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

  // if (isLoading) {
  //   return <Loading />;
  // }

  if (!currentUser) {
    return <Login handleCreateUser={registerUser} />;
  }

  return (
    <div className="App">
      <Room
        currentUser={currentUser}
        users={users}
        stories={stories}
        clearVotes={clearVotes}
        socket={socket}
      />
    </div>
  );
}

export default App;
