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
  CREATE_LINK_ERROR,
  CLEAN_STATE,
  ADD_PASSWORD,
  ADD_DOWNLOAD_LIMIT
} from '../../types';

const AppState = ({ children }) => {

  const initialState = {
    msgFile: null,
    name: '',
    originalName: '',
    loading: false,
    downloads: 1,
    password: '',
    author: null,
    url: ''
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

  const createLink = async () => {
    const data = {
      name: state.name,
      original_name: state.originalName,
      downloads: state.downloads,
      password: state.password,
      author: state.author,
    }
    console.log(data);

    try {
      const response = await axiosClient.post('/api/links', data);
      dispatch({
        type: CREATE_LINK_SUCCESS,
        payload: response.data.msg
      });
    } catch (error) {
      console.log(error)
    }
  }

  const cleanState = () => {
    dispatch({
      type: CLEAN_STATE,
    });
  }

  const addPassword = password => {
    dispatch({
      type: ADD_PASSWORD,
      payload: password
    });
  }

  const addDownloadLimit = limit => {
    dispatch({
      type: ADD_DOWNLOAD_LIMIT,
      payload: limit
    })
  }

  return (
    <appContext.Provider
      value={{
        msgFile: state.msgFile,
        name: state.name,
        originalName: state.originalName,
        loading: state.loading,
        downloads: state.downloads,
        password: state.password,
        author: state.author,
        url: state.url,
        cleanState,
        showAlert,
        uploadFile,
        createLink,
        addPassword,
        addDownloadLimit
      }}
    
    >
      {children}


    </appContext.Provider>
  )

}

export default AppState;