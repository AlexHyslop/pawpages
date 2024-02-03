import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import quoteAction from "../../store/actions/quote.action";
 
export default function QuoteDisplay(props) {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  
 
  const handleGetQuotes = () => {
    dispatch(quoteAction.updateQuote({
       currentQuote : {
       }
     }));   

   }; 

  return (
    <div>
      
    </div>
  );
}  
  