import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loading, resetApp } from './actions';
import { loadingSelector, localUserId } from './selectors';

import { handleSocketListener } from '../../api';

const useApp = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(loadingSelector);

  const listenReload = useCallback(() => {
    handleSocketListener({
      type: 'reset',
      callback: () => {
        dispatch(resetApp());
      },
    });
  }, [dispatch]);

  const setLoading = useCallback(() => {
    dispatch(loading());
  }, [dispatch]);

  return { isLoading, listenReload, localUserId, setLoading };
};

export default useApp;
