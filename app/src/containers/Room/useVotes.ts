import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setUserVote as setUserVoteAction,
  setVotingEnded,
} from '../App/actions';
import {
  userVoteSelector,
  votesListSelector,
  votingEndedSelector,
} from '../App/selectors';

import { handleSocketRequest } from '../../api';

const useVotes = () => {
  const dispatch = useDispatch();

  const userVote = useSelector(userVoteSelector);
  const votes = useSelector(votesListSelector);
  const votingEnded = useSelector(votingEndedSelector);

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

  const setUserVote = useCallback(
    (payload) => {
      dispatch(setUserVoteAction(payload));
    },
    [dispatch],
  );

  return {
    clearVotes,
    endVoting,
    setUserVote,
    userVote,
    vote,
    votes,
    votingEnded,
  };
};

export default useVotes;
