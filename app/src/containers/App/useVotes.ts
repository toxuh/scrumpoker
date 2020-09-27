import { useCallback, useState } from 'react';

import { handleSocketListener, handleSocketRequest } from '../../api';
import { VoteType } from '../../types';

const useVotes = () => {
  const [votes, setVotes] = useState<VoteType[]>([] as VoteType[]);
  const [summary, setSummary] = useState(0);
  const [voteEnded, setVoteEnded] = useState(false);

  const listenVotes = useCallback(() => {
    handleSocketListener({
      type: 'votes-list',
      callback: (votes: VoteType[]) => {
        const points = votes.map((vote) => Number(vote.points) || 0);
        const rawVoteResult = points.reduce((acc, a): number => {
          return acc + a;
        }, 0);

        setSummary(Number(rawVoteResult.toFixed(1)));
        setVotes(votes);
      },
    });
  }, [handleSocketListener]);

  const listenEndVoting = useCallback(() => {
    handleSocketListener({
      type: 'end-vote',
      callback: (condition: boolean) => {
        setVoteEnded(condition);
      },
    });
  }, [handleSocketListener]);

  const vote = useCallback(
    (payload) => {
      handleSocketRequest({
        type: 'vote',
        payload,
      });
    },
    [handleSocketRequest],
  );

  const clearVotes = useCallback(
    (payload) => {
      handleSocketRequest({
        type: 'clear-votes',
        payload,
      });
      setVoteEnded(false);
    },
    [handleSocketRequest],
  );

  const endVoting = useCallback(
    (payload) => {
      handleSocketRequest({
        type: 'end-voting',
        payload,
      });
    },
    [handleSocketRequest],
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
