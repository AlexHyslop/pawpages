import { handleActions } from 'redux-actions';
import actions from '../actions/rates.action';

export default handleActions(
  {
    [actions.updateEconomyRates]: (state, action) => {  
      return {...state, economyRates: action.payload};
    },
    [actions.updateExpressRates]: (state, action) => {  
      return {...state, expressRates: action.payload};
    }, 
  },
  {}
);
