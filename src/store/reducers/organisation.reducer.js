import { handleActions } from 'redux-actions';
import actions from '../actions/organisation.action';

export default handleActions(
    {
        [actions.updateOrganisation]: (state, action) => {  
          return {...state, ...action.payload};
        }
    },
    {}
);