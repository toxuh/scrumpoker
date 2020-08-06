import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import Login from '../Login/Login';
import Room from '../Room/Room';

import useApp from './useApp';

import './App.css';

function App() {
  const [userName, setUserName] = useState('');

  const { getUserName, isLSExists } = useApp(setUserName);

  useEffect(() => {
    if (isLSExists) {
      getUserName();
    }
  });

  return (
    <Container className="App" fluid>
      {isLSExists ? (
        <Room name={userName} />
      ) : (
        <Login handleSetUserName={setUserName} />
      )}
    </Container>
  );
}

export default App;
