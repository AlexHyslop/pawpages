import { handleActions } from 'redux-actions';
import actions from '../actions/booking.action';

export default handleActions(
  {
      [actions.updateBooking]: (state, action) => {  
        return {...state, ...action.payload};
      }
  },
  {}
);
