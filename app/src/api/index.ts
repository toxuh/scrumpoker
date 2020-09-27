import io from 'socket.io-client';

type HandleSocketRequestType = {
  type: string;
  payload?: string | number | [] | {};
};

type HandleSocketListenerType = {
  type: string;
  callback: Function;
};

const socket = io.connect('http://localhost:3011');

export const handleSocketRequest = ({
  type,
  payload,
}: HandleSocketRequestType) => {
  socket.emit(type, payload);
};

export const handleSocketListener = ({
  type,
  callback,
}: HandleSocketListenerType) => {
  socket.on(type, callback);
};

export const handleSocketDisconnect = () => {
  socket.disconnect();
};
