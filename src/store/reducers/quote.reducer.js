import { handleActions } from 'redux-actions';
import actions from '../actions/quote.action';

export default handleActions(
  {
    [actions.updateCurrentQuote]: (state, action) => {  
      return {...state, currentQuote: action.payload};
    },
    [actions.updateMinimalQuote]: (state, action) => {  
      return {...state, minimalQuote: action.payload};
    },
    [actions.updateServiceResults]: (state, action) => {  
      return {...state, serviceResults: action.payload};
    },
    [actions.setSelectedService]: (state, action) => {  
      return {...state, selectedService: action.payload};
    }
  },
  {}
);
