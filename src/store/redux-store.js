import { configureStore } from '@reduxjs/toolkit'
import user from './reducers/user.reducer'; 
import { compose, combineReducers } from 'redux'; 
import logger from 'redux-logger'
import { batchedSubscribe } from 'redux-batched-subscribe';

const rootReducer = combineReducers({ 
    user: user,
})
  
const initialState = {
    user: {
        config: {
          
        }
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

 
