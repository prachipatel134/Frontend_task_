import { combineReducers } from 'redux';
import repoReducer from './repoSlice';


const rootReducer = combineReducers({
  reposdata: repoReducer,
});

export default rootReducer;