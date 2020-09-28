import React, { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import Login from '../Login/Login';
import Room from '../Room/Room';

import useApp from './useApp';
import useAuth from './useAuth';
import useStories from './useStories';
import useUsers from './useUsers';
import useVotes from './useVotes';

import { handleSocketDisconnect } from '../../api';

import './App.css';

function App() {
  const { listenReload, localUserId } = useApp();
  const { currentUser, listenUserRegistered, registerUser } = useAuth();
  const { getStories, listenStoriesList } = useStories();
  const {
    connectUser,
    disconnectUser,
    listenUsers,
    moderatorRole,
  } = useUsers();
  const { listenEndVoting, listenVotes, summary } = useVotes();

  useEffect(() => {
    if (localUserId) {
      connectUser(localUserId);
      getStories();

      window.addEventListener('beforeunload', () => {
        disconnectUser(localUserId);
        handleSocketDisconnect();
      });
    }
    return () => {
      if (localUserId) {
        window.removeEventListener('beforeunload', () => {
          disconnectUser(localUserId);
          handleSocketDisconnect();
        });
      }
    };
  }, [connectUser, getStories, localUserId, disconnectUser]);

  useEffect(() => {
    listenReload();
    listenUserRegistered();
    listenUsers();
    listenStoriesList();
    listenVotes();
    listenEndVoting();
  });

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
      <Room currentUser={currentUser} summary={summary} />
    </div>
  );
}

export default App;
