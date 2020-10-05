import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loading, resetApp, setLocalUserId } from './actions';
import {
  loadingSelector,
  localUserId as lsId,
  localUserIdSelector,
} from './selectors';

import { handleSocketListener } from '../../api';
import { APP_RESET } from '../../constants/requests';

const useApp = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(loadingSelector);
  const localUserId = useSelector(localUserIdSelector);

  const bootstrap = useCallback(() => {
    if (lsId) {
      dispatch(setLocalUserId(lsId));
    }
  }, [dispatch]);

  const listenReload = useCallback(() => {
    handleSocketListener({
      type: APP_RESET,
      callback: () => {
        dispatch(resetApp());
      },
    });
  }, [dispatch]);

  const setLoading = useCallback(() => {
    dispatch(loading());
  }, [dispatch]);

  return { bootstrap, isLoading, listenReload, localUserId, setLoading };
};

export default useApp;
