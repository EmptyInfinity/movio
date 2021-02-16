import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import moviesReducer from './movies';

const reducers = combineReducers({
  movies: moviesReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));

export default store;
