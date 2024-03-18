import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom'; 
import quoteAction from "../../store/actions/quote.action"; 
import QuoteServiceResults from "./quote-service-results.component";
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
      <div className="quote-dashboard">
        <QuoteDisplay />
        <div className="service-results-container">
              {serviceResults && serviceResults.map((result, index) => (
                <QuoteServiceResults key={index} serviceResult={result} /> 
              ))} 
        </div>
      </div>
    </div>
  );
}
