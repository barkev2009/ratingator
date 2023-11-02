import React, { useCallback, useEffect, useState } from 'react';
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { useDispatch } from 'react-redux';
import { check } from './api/user';
import { setIsAuth, setUser } from './slices/user';

function App() {

  const dispatch = useDispatch();

  const checkAuth = useCallback(
    () => {
      check().then(
        user => {
          dispatch(setUser(user));
          dispatch(setIsAuth(true));
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
