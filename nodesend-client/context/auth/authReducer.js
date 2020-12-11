import { 
  SUCCESSFUL_REGISTER,
  ERROR_REGISTER,
  CLEAN_ALERT,
  SUCESSFUL_LOGIN,
  ERROR_LOGIN,
  AUTHENTICATED_USER,
  LOGOUT

} from '../../types';

const authReducer = (state, action) => {
  
  switch(action.type) {

    case ERROR_LOGIN:
    case ERROR_REGISTER:
    case SUCCESSFUL_REGISTER:
      return {
        ...state,
        message: action.payload
      }
    case SUCESSFUL_LOGIN:
      localStorage.setItem('token', action.payload)
      return {
        ...state,
        token: action.payload,
        authenticated: true
      }
    case AUTHENTICATED_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      }
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        authenticated: null
      }
    
    case CLEAN_ALERT:
      return {
        ...state,
        message: null
      }

    default: {
      return state

    }
  }
}

export default authReducer;