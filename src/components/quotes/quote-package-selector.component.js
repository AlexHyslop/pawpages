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
    dispatch(quoteAction.updateQuote(currentQuote));   

   }; 

  return (
    <div>
      <QuoteBox displayName="Small Box" type="smallBox" weight='20kg' price='£30' icon='smallboxIcon' />  
      <QuoteBox displayName="Large box" type="largeBox" weight='30kg' price='£50' icon='largeboxIcon' />  
    </div>
  );
}   