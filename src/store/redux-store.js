import { configureStore } from '@reduxjs/toolkit'
import user from './reducers/user.reducer'; 
import state from './reducers/state.reducer';
import organisation from './reducers/organisation.reducer';
import { compose, combineReducers } from 'redux'; 
import logger from 'redux-logger'
import { batchedSubscribe } from 'redux-batched-subscribe';

const rootReducer = combineReducers({ 
    user: user,
    state: state,
    organisation: organisation
})
  
const initialState = {
    user: {
        config: {
          
        }
    },
    state: {
    },
    organisation: {

    }
}

const enhancers = compose(
    batchedSubscribe(fn => fn())
);
 
export const store = configureStore({
  reducer: rootReducer, 
  actions :{},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: enhancers,
  initialState: initialState
})

 
