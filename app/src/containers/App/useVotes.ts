import { useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';

const useVotes = (socket: typeof Socket) => {
  const [votes, setVotes] = useState<string[]>([]);

  const listenVotes = useCallback(() => {
    socket.on('votes-list', (votes: string[]) => {
      setVotes(votes);
    });
  }, [socket]);

  const vote = useCallback(
    (payload) => {
      socket.emit('vote', payload);
    },
    [socket],
  );

  return { listenVotes, vote, votes };
};

export default useVotes;
