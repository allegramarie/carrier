import {combineReducers} from 'redux';
import campaigns from './campaigns';

const rootReducer = combineReducers({
  campaigns,
});

export default rootReducer;
