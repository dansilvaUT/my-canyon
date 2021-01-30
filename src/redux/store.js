import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './reducers/userReducer';
import canyonReducer from './reducers/canyonReducer';
import promiseMiddleware from 'redux-promise-middleware';

const rootReducer = combineReducers({
    userReducer,
    canyonReducer
});
export default createStore(rootReducer, applyMiddleware(promiseMiddleware));