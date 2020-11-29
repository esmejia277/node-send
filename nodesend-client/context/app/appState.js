import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import appContext from './appContext';
import appReducer from './appReducer';
import {
  SHOW_ALERT,
  CLEAN_ALERT,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_LOADING,
  CREATE_LINK_SUCCESS,
  CREATE_LINK_ERROR
} from '../../types';

const AppState = ({ children }) => {

  const initialState = {
    msgFile: null,
    name: '',
    originalName: '',
    loading: false
  }

  // create dispatch and stawte
  const [state, dispatch] = useReducer(appReducer, initialState);


  // upload file to server
  const uploadFile = async (formData, nameFile) => {
    
    dispatch({
      type: UPLOAD_FILE_LOADING
    })

    try {
      const response = await axiosClient.post('/api/files', formData);

      dispatch({
        type: UPLOAD_FILE_SUCCESS,
        payload: {
          name: response.data.file,
          originalName: nameFile
        }
      });
      
    } catch (error) {
      dispatch({
        type: UPLOAD_FILE_ERROR,
        payload: error.response.data.msg
      });
    }
  }


  const showAlert = msg => {
    dispatch({
      type: SHOW_ALERT,
      payload: msg
    });

    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERT
      });
    }, 3000);
  }



  return (
    <appContext.Provider
      value={{
        msgFile: state.msgFile,
        name: state.name,
        originalName: state.originalName,
        loading: state.loading,
        showAlert,
        uploadFile
      }}
    
    >
      {children}


    </appContext.Provider>
  )

}

export default AppState;