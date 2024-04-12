import { handleActions } from 'redux-actions';
import actions from '../actions/shipment.action';

export default handleActions(
  {
    [actions.updateShipment]: (state, action) => {  
      return {...state, shipment: action.payload};
    }
  },
  {}
);
