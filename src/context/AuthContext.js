import React, { createContext, useEffect, useReducer } from 'react';
import { projectAuth } from '../firebase/config';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unbsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({
        type: 'AUTH_IS_READY',
        payload: user,
      });
      unbsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}
