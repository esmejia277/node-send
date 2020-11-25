import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { 
  SUCCESSFUL_REGISTER,
  ERROR_REGISTER,
  CLEAN_ALERT,
  SUCESSFUL_LOGIN,
  ERROR_LOGIN,
  AUTHENTICATED_USER,
  LOGOUT
  
} from '../../types';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ( {children} ) => {
  
  // initial state
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null, // if render in client
    authenticated: null,
    user: null,
    message: null
  }

  // define reducer
  const [ state, dispatch ] = useReducer(authReducer, initialState);

  // register a new user
  const registerUser = async data => {
    try {
      const response = await axiosClient.post('api/users', data);
      dispatch({
        type: SUCCESSFUL_REGISTER,
        payload: response.data.msg
      });
    } catch (error) {
      dispatch({
        type: ERROR_REGISTER,
        payload: error.response.data.msg
      });
    }

    // clean alert after 3 seconds
    setTimeout( () => {
      dispatch({
        type: CLEAN_ALERT
      })
    }, 3000)
  }

  const login = async data => {
    try {
      const response = await axiosClient.post('/api/auth', data);
      dispatch({
        type: SUCESSFUL_LOGIN,
        payload: response.data.token
      });

    } catch (error) {
      dispatch({
        type: ERROR_LOGIN,
        payload: error.response.data.msg
      });
      
    }

    // clean alert after 3 seconds
    setTimeout( () => {
      dispatch({
        type: CLEAN_ALERT
      })
    }, 3000)
  }

  const authenticatedUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token);
    }

    try {
      const response = await axiosClient.get('api/auth');
      dispatch({
        type: AUTHENTICATED_USER,
        payload: response.data.user
      });
      
    } catch (error) {
      dispatch({
        type: ERROR_LOGIN,
        payload: error.response.data.msg
      })
    }
  }

  const logout = () => {
    dispatch({
      type: LOGOUT
    })
  }



  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        registerUser,
        authenticatedUser,
        login,
        logout

      }}
    >
      {children}

    </authContext.Provider>
    
  )
}

export default AuthState;