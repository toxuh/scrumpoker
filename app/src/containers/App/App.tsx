import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import Login from '../Login/Login';
import Room from '../Room/Room';

import useApp from './useApp';

import { UserResponseType, RoomType } from '../../types';

import './App.css';

function App() {
  const [user, setUser] = useState<UserResponseType>({} as UserResponseType);
  const [room, setRoom] = useState<RoomType>({} as RoomType);

  const { localUserId, socket } = useApp();

  const getUserName = useCallback(() => {
    socket.emit('get-user-name', localUserId);
  }, [localUserId, socket]);

  useEffect(() => {
    if (Boolean(localUserId)) {
      getUserName();
    }
  }, []);

  useEffect(() => {
    socket.on('user-name', (user: UserResponseType) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <Container className="App" fluid>
      {Boolean(user) ? (
        <Room socket={socket} user={user} />
      ) : (
        <Login handleSetUser={setUser} />
      )}
    </Container>
  );
}

export default App;
