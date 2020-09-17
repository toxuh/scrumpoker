import { useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';

import { VoteType } from '../../types';

const useVotes = (socket: typeof Socket) => {
  const [votes, setVotes] = useState<VoteType[]>([] as VoteType[]);
  const [summary, setSummary] = useState(0);
  const [voteEnded, setVoteEnded] = useState(false);

  const listenVotes = useCallback(() => {
    socket.on('votes-list', (votes: VoteType[]) => {
      const points = votes.map((vote) => Number(vote.points) || 0);
      const rawVoteResult = points.reduce((acc, a): number => {
        return acc + a;
      }, 0);

      setSummary(Number(rawVoteResult.toFixed(1)));
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
      setVoteEnded(false);
    },
    [socket],
  );

  const endVoting = useCallback(
    ({ taskId, points }) => {
      socket.emit('end-voting', { taskId, points });
    },
    [socket],
  );

  return {
    clearVotes,
    endVoting,
    listenEndVoting,
    listenVotes,
    summary,
    vote,
    votes,
    voteEnded,
  };
};

export default useVotes;
