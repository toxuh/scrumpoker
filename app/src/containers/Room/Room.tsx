import React from 'react';

type RoomTypes = {
  name: string;
};

const Room = ({ name }: RoomTypes) => {
  return <>{name && <h1>Hello {name}!!!!</h1>}</>;
};

export default Room;
