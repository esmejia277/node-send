import { 
  SUCCESSFUL_REGISTER,
  ERROR_REGISTER,
  CLEAN_ALERT

} from '../../types';

export default (state, action) => {
  
  switch(action.type) {

    case ERROR_REGISTER:
    case SUCCESSFUL_REGISTER:
      return {
        ...state,
        message: action.payload
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