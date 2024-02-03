import { handleActions } from 'redux-actions';
import actions from '../actions/booking.action';

export default handleActions(
  {
      [actions.updateQuote]: (state, action) => {  
        return {...state, currentQuote: action.payload};
      }
  },
  {}
);
