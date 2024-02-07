import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import quoteAction from "../../store/actions/quote.action";
import { current } from "@reduxjs/toolkit";
 
export default function QuoteDisplay(props) {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  
 
  const handleGetQuotes = () => {
    dispatch(quoteAction.updateCurrentQuote({
       currentQuote : {
       }
     }));   

   }; 

  return (
    <div> 
        <div style={{display:'flex', flexDirection:'column'}}> 

            <h5> Order Details </h5>
            <p> From: {currentQuote?.collectionCountry} to {currentQuote?.destinationCountry} </p>
            <p> SubTotal:  {(currentQuote?.smallBoxes * 20) + (currentQuote?.largeBoxes * 30)}</p>
            <p> Total Items: {currentQuote?.totalBoxes} </p>
            {currentQuote?.smallBoxes > 0 ? <p> Small Boxes: {currentQuote?.smallBoxes} </p> : null}
            {currentQuote?.largeBoxes > 0 ? <p> Small Boxes: {currentQuote?.largeBoxes} </p> : null}
        </div>

        <div>
           Collection Address: {currentQuote?.collectionAddress?.postalCode + ","+  currentQuote?.collectionAddress?.city }
        </div>

        <div>
          Delivery Address:{currentQuote?.deliveryAddress?.postalCode + ","+ currentQuote?.deliveryAddress?.city}
        </div>

        <div style={{maxWidth : '30%'}}>
            <p> 
             Please note that we do not accept backpacks or duffel bags.
              For every item which exceeds the weight or size restrictions 
              you will be charged extra in 
              accordance with our terms and conditions.
             </p>
        </div>

       

    </div>

    
  );
}  
  