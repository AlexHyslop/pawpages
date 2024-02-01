import { handleActions } from 'redux-actions';
import actions from '../actions/user.action'; 

export default handleActions(
    {
        [actions.updateUser]: (state, action) => { 
          return {...state, ...action.payload};
        }
    },
    {}
);