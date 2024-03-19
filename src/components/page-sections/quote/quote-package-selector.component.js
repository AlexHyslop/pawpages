import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import quoteAction from "../../../store/actions/quote.action";
import QuoteBox from "./quote-box.component";

export default function QuotePackageSelector(props) {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);
   const navigate = useNavigate();
  const dispatch = useDispatch(); 
  
 
  const handleGetQuotes = () => {
    dispatch(quoteAction.updateCurrentQuote(currentQuote));   

   }; 

  return (
    <> 
      <QuoteBox displayName="Small Box" type="smallBox" weight='20kg'icon='smallboxIcon' 
        maxHeight="46cm" maxWidth="46cm" maxLength="46cm" />  

      <QuoteBox displayName="Large box" type="largeBox" weight='30kg'icon='largeboxIcon' 
       maxHeight="60cm" maxWidth="50cm" maxLength="50cm" />  
    </>
  );
}   