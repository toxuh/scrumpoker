import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setVotesList, setVotingEnded } from './actions';
import { votesListSelector, votingEndedSelector } from './selectors';

import { handleSocketListener, handleSocketRequest } from '../../api';
import { VoteType } from '../../types';

const useVotes = () => {
  const dispatch = useDispatch();

  const votes = useSelector(votesListSelector);
  const votingEnded = useSelector(votingEndedSelector);

  const [summary, setSummary] = useState(0);

  const listenVotes = useCallback(() => {
    handleSocketListener({
      type: 'votes-list',
      callback: (votes: VoteType[]) => {
        const points = votes.map((vote) => Number(vote.points) || 0);
        const rawVoteResult = points.reduce((acc, a): number => {
          return acc + a;
        }, 0);

        setSummary(Number(rawVoteResult.toFixed(1)));
        dispatch(setVotesList(votes));
      },
    });
  }, [dispatch]);

  const listenEndVoting = useCallback(() => {
    handleSocketListener({
      type: 'end-vote',
      callback: (condition: boolean) => {
        dispatch(setVotingEnded(condition));
      },
    });
  }, [dispatch]);

  const vote = useCallback((payload) => {
    handleSocketRequest({
      type: 'vote',
      payload,
    });
  }, []);

  const clearVotes = useCallback(
    (payload) => {
      handleSocketRequest({
        type: 'clear-votes',
        payload,
      });
      dispatch(setVotingEnded(false));
    },
    [dispatch],
  );

  const endVoting = useCallback((payload) => {
    handleSocketRequest({
      type: 'end-voting',
      payload,
    });
  }, []);

  return {
    clearVotes,
    endVoting,
    listenEndVoting,
    listenVotes,
    summary,
    vote,
    votes,
    votingEnded,
  };
};

export default useVotes;
