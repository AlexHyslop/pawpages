import { handleActions } from 'redux-actions';
import actions from '../actions/quote.action';

export default handleActions(
  {
      [actions.updateQuote]: (state, action) => {  
        return {...state, currentQuote: action.payload};
      }
  },
  {}
);
