import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { 
  SUCCESSFUL_REGISTER,
  ERROR_REGISTER,
  CLEAN_ALERT
  
} from '../../types';
import axiosClient from '../../config/axios';


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
        registerUser,
        authenticatedUser,

      }}
    >
      {children}

    </authContext.Provider>
    
  )
}

export default AuthState;