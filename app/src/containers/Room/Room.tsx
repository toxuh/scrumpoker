import React from 'react';
import { Socket } from 'socket.io-client';

import { Room as RoomComponent } from '../../components';

import { UserResponseType } from '../../types';

type RoomTypes = {
  user: UserResponseType;
  socket: typeof Socket;
};

const Room: React.FC<RoomTypes> = ({ user, socket }) => {
  return <RoomComponent user={user} />;
};

export default Room;
