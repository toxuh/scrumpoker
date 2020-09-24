import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import { loading, resetApp } from './actions';
import { loadingSelector, localUserId } from './selectors';

const useApp = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(loadingSelector);

  const socket = io.connect('http://localhost:3011');

  const listenReload = useCallback(() => {
    socket.on('reset', () => {
      dispatch(resetApp());
    });
  }, [socket]);

  const setLoading = useCallback(() => {
    dispatch(loading());
  }, [dispatch]);

  return { isLoading, listenReload, localUserId, setLoading, socket };
};

export default useApp;
