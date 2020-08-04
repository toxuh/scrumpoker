import React, { useEffect, useState } from 'react';

import Login from '../Login/Login';
import Room from '../Room/Room';

import useApp from './useApp';

import './App.css';

function App() {
  const [userName, setUserName] = useState('');

  const { bootstrap, isLSExists } = useApp();

  useEffect(() => {
    if (isLSExists) {
      bootstrap().then((response) => {
        if (response.name) {
          setUserName(response.name);
        }
      });
    }
  }, [bootstrap, isLSExists]);

  return (
    <div className="App">
      {isLSExists ? <Room name={userName} /> : <Login />}
    </div>
  );
}

export default App;
