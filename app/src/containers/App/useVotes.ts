import { useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';

import { VoteType } from '../../types';

const useVotes = (socket: typeof Socket) => {
  const [votes, setVotes] = useState<VoteType[]>([] as VoteType[]);
  const [voteEnded, setVoteEnded] = useState(false);

  const listenVotes = useCallback(() => {
    socket.on('votes-list', (votes: VoteType[]) => {
      setVotes(votes);
    });
  }, [socket]);

  const listenEndVoting = useCallback(() => {
    socket.on('end-vote', (condition: boolean) => {
      setVoteEnded(condition);
    });
  }, [socket]);

  const vote = useCallback(
    (payload) => {
      socket.emit('vote', payload);
    },
    [socket],
  );

  const clearVotes = useCallback(
    (payload) => {
      socket.emit('clear-votes', payload);
    },
    [socket],
  );

  return { clearVotes, listenEndVoting, listenVotes, vote, votes, voteEnded };
};

export default useVotes;
