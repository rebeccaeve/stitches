import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { store } from './reducers';

const reducers = {
    store
};

const rootReducer = combineReducers(reducers);

export const configureStore = () =>
    createStore(
        rootReducer, composeWithDevTools(applyMiddleware(thunk))
    );