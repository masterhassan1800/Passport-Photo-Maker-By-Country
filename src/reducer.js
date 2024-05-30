import { combineReducers } from 'redux';
import {
  SELECT_FILE,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  SET_UPLOADING,
} from './actions';

const initialState = {
  selectedFile: null,
  imageURL: '',
  error: '',
  uploading: false,
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_FILE:
      return { ...state, selectedFile: action.payload };
    case UPLOAD_SUCCESS:
      return { ...state, imageURL: action.payload, error: '' };
    case UPLOAD_FAILURE:
      return { ...state, error: action.payload, imageURL: '' };
    case SET_UPLOADING:
      return { ...state, uploading: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  upload: uploadReducer,
});

export default rootReducer;
