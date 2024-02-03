import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import quoteAction from "../../store/actions/quote.action";
import QuoteDisplay from "./quote-display.component";
import QuotePackageSelector from "./quote-package-selector.component";
 
export default function BookingDashboard(props) {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);
const navigate = useNavigate();
  const dispatch = useDispatch(); 
  
  

  return (
    <div style={{display: 'flex', flexDirection:'row'}}>
       
    </div>
  );
}  
  