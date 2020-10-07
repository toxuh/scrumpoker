import io from 'socket.io-client';

type HandleSocketRequestType = {
  type: string;
  payload?: string | number | [] | Record<string, unknown>;
};

type HandleSocketListenerType = {
  type: string;
  callback: Function; // eslint-disable-line
};

const { REACT_APP__SERVER_ENDPOINT, REACT_APP__SERVER_PORT } = process.env;

const socket = io.connect(
  `${REACT_APP__SERVER_ENDPOINT}:${REACT_APP__SERVER_PORT}`,
);

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
