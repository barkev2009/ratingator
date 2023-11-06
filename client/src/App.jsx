import React, { useCallback, useEffect } from 'react';
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { useDispatch } from 'react-redux';
import { check } from './api/user';
import { setIsAuth, setUser } from './reducers/user';

function App() {

  const dispatch = useDispatch();

  const checkAuth = useCallback(
    () => {
      check().then(
        user => {
          dispatch(setUser(user));
          dispatch(setIsAuth(true));
        }
      ).catch(
        error => {
          dispatch(setIsAuth(false));
        }
      );
    }, [dispatch]
  )

  useEffect(
    () => {
      checkAuth()
    }, [checkAuth]
  )

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
