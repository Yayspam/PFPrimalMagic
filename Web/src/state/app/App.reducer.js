import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import primalMagicReducer from './primalMagic.reducer';

const AppReducer = history =>
  combineReducers({
    router: connectRouter(history),
    primalMagic: primalMagicReducer,
  });

export default AppReducer;
