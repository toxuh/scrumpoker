import React, { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

import useRoom from './useRoom';

import { UserResponseType } from '../../types';

type RoomTypes = {
  name: string;
};

const Room = ({ name }: RoomTypes) => {
  const { addToast } = useToasts();
  const { handleUserConnected, socket } = useRoom();

  useEffect(() => {
    socket.on('user-connected', (user: UserResponseType) => {
      addToast(user.name + ' connected!', {
        appearance: 'info',
      });
    });

    if (name) {
      handleUserConnected();
    }
  }, [name]);

  return <>{name && <h1>Hello {name}!!!!</h1>}</>;
};

export default Room;
