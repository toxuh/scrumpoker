import React, { useEffect } from 'react';

import useRoom from './useRoom';

type RoomTypes = {
  name: string;
};

const Room = ({ name }: RoomTypes) => {
  const { handleUserConnected } = useRoom();

  useEffect(() => {
    if (name) {
      handleUserConnected();
    }
  });

  return <>{name && <h1>Hello {name}!!!!</h1>}</>;
};

export default Room;
