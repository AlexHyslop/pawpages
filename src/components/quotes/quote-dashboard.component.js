import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'; 
import quoteAction from "../../store/actions/quote.action"; 
import QuoteSelector from "../page-sections/quote/quote-selector.component";
import QuoteDisplay from "./quote-display.component";

export default function QuoteDashboard(props) {
  const serviceResults = useSelector((state) => state?.quote?.serviceResults);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  
  
  const handleGetQuotes = () => {
    dispatch(quoteAction.updateCurrentQuote({
       currentQuote : {
       }
     }));   
   }; 

  return (
    <div className="container">
         <div className="service-results-container">  
          <QuoteSelector  />  
        </div>
        <QuoteDisplay /> 
     </div>
  );
}
