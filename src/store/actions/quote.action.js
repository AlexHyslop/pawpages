import { createAction } from 'redux-actions'; 

export default{
    updateCurrentQuote: createAction('UPDATE_CURRENT_QUOTE'),
    updateMinimalQuote: createAction('UPDATE_MINIMAL_QUOTE'),
 };