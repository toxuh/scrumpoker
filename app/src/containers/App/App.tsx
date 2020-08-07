import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import Login from '../Login/Login';
import Room from '../Room/Room';

import useApp from './useApp';

import { Task, UserResponseType, RoomType } from '../../types';

import './App.css';

function App() {
  const [user, setUser] = useState<UserResponseType>({} as UserResponseType);
  // const [room, setRoom] = useState<RoomType>({} as RoomType);
  const [tasks, setTasks] = useState<Task[]>([] as Task[]);

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
    socket.on('tasks-list', (tasks: Task[]) => {
      setTasks(tasks);
    });
  }, []);

  return (
    <Container className="App" fluid>
      {Boolean(user) ? (
        <Room user={user} tasks={tasks} socket={socket} />
      ) : (
        <Login handleSetUser={setUser} />
      )}
    </Container>
  );
}

export default App;
