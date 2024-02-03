import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import quoteAction from "../../store/actions/quote.action";
import QuoteBox from "./quote-box.component";

export default function QuotePackageSelector(props) {
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
      <QuoteBox type="Small Box" weight='15kg' price='£30' icon='smallboxIcon' />  
      <QuoteBox type="Medium Box" weight='20kg' price='£40' icon='mediumboxIcon' />  
      <QuoteBox type="Large Box" weight='30kg' price='£50' icon='largeboxIcon' />  
    </div>
  );
}   