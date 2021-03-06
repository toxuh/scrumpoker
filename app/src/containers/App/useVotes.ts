import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setVotesList, setVotingEnded, setSummary } from './actions';
import { summarySelector } from './selectors';

import { handleSocketListener } from '../../api';
import { GET_VOTES_LIST, VOTE_ENDED } from '../../constants/requests';

import { VoteType } from '../../types';

const useVotes = () => {
  const dispatch = useDispatch();

  const summary = useSelector(summarySelector);

  const listenVotes = useCallback(() => {
    handleSocketListener({
      type: GET_VOTES_LIST,
      callback: (votes: VoteType[]) => {
        const points = votes.map((vote) => Number(vote.points) || 0);
        const rawVoteResult = points.reduce((acc, a): number => {
          return acc + a;
        }, 0);

        dispatch(setSummary(Number(rawVoteResult.toFixed(1))));
        dispatch(setVotesList(votes));
      },
    });
  }, [dispatch]);

  const listenEndVoting = useCallback(() => {
    handleSocketListener({
      type: VOTE_ENDED,
      callback: (condition: boolean) => {
        dispatch(setVotingEnded(condition));
      },
    });
  }, [dispatch]);

  return {
    listenEndVoting,
    listenVotes,
    summary,
  };
};

export default useVotes;
