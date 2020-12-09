import {
  SHOW_ALERT,
  CLEAN_ALERT,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_LOADING,
  CREATE_LINK_SUCCESS,
  CREATE_LINK_ERROR,
  CLEAN_STATE
  
} from '../../types';

const appReducer = (state, action) => {
  switch(action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        msgFile: action.payload
      }
    case CLEAN_ALERT:
      return {
        ...state,
        msgFile: null
      }
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        originalName: action.payload.originalName,
        loading: false
      }
    case UPLOAD_FILE_ERROR:
      return {
        ...state,
        msgFile: action.payload,
        loading: false

      }
    case UPLOAD_FILE_LOADING:
      return {
        ...state,
        loading: true
      }
    case CREATE_LINK_SUCCESS:
      return {
        ...state,
        url: action.payload
      }
    case CLEAN_STATE:
      return {
        ...state,
        msgFile: null,
        name: '',
        originalName: '',
        loading: false,
        downloads: 1,
        password: '',
        author: null,
        url: ''
      }

    default:
      return state
  }
}


export default appReducer;