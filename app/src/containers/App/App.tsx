import React, { useEffect } from 'react';

import Room from '../Room/Room';

import useApp from './useApp';
import useStories from './useStories';
import useUsers from './useUsers';

import './App.css';

function App() {
  const { localUserId, socket } = useApp();
  const { getStories, listenStoriesList, stories } = useStories(socket);
  const { connectUser, disconnectUser, listenUsers, users } = useUsers(socket);

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
    listenUsers();
    listenStoriesList();
  }, []);

  return (
    <div className="App">
      <Room users={users} stories={stories} socket={socket} />
    </div>
  );
}

export default App;
