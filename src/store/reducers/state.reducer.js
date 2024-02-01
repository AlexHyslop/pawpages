import { handleActions } from 'redux-actions';
import actions from '../actions/state.action';

export default handleActions(
    {
        [actions.updateState]: (state, action) => {  
          return {...state, ...action.payload};
        }
    },
    {}
);