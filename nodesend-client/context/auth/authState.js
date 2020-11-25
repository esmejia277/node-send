import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { AUTHENTICATED_USER } from '../../types';

const AuthState = ( {children} ) => {
  
  // initial state
  const initialState = {
    token: '',
    authenticated: null,
    user: null,
    message: null
  }

  // define reducer
  const [ state, dispatch ] = useReducer(authReducer, initialState);

  // authenticated user
  const authenticatedUser = name => {
    dispatch({
      type: AUTHENTICATED_USER,
      payload: name
    })

  }


  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        authenticatedUser
      }}
    >
      {children}

    </authContext.Provider>
    
  )
}

export default AuthState;