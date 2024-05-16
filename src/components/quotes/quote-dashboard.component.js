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
    <div className="container mx-auto mt-14 px-6 lg:px-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 border p-6">
        <div className="service-results-container col-span-3 overflow-x-scroll">  
          <QuoteSelector  />  
        </div>
        <div className="col-span-1">
          <QuoteDisplay /> 
        </div>
      </div> 
     </div>
  );
}
