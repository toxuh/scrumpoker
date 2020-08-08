import React, { useCallback, useEffect, useState } from 'react';

import Login from '../Login/Login';
import Room from '../Room/Room';

import useApp from './useApp';

import { Story, UserResponseType } from '../../types';

import './App.css';

function App() {
  const [user, setUser] = useState<UserResponseType>({} as UserResponseType);
  const [stories, setStories] = useState<Story[]>([] as Story[]);

  const { localUserId, socket } = useApp();

  const getUser = useCallback(() => {
    socket.emit('get-user-name', localUserId);
  }, [localUserId, socket]);

  const getTasks = useCallback(() => {
    socket.emit('get-tasks');
  }, [socket]);

  useEffect(() => {
    if (Boolean(localUserId)) {
      getUser();
      getTasks();
    }
  }, []);

  useEffect(() => {
    socket.on('user-name', (user: UserResponseType) => {
      setUser(user);
    });
    socket.on('tasks-list', (stories: Story[]) => {
      setStories(stories);
    });
  }, []);

  return (
    <div className="App">
      {Boolean(user) ? (
        <Room user={user} stories={stories} socket={socket} />
      ) : (
        <Login handleSetUser={setUser} />
      )}
    </div>
  );
}

export default App;
