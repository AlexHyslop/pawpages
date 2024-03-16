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
    <div className="quote-display"> 
        <div style={{display:'flex', flexDirection:'column'}}> 
            <h2> Order Details </h2>
            <p className="text-md"> From: {currentQuote?.collectionCountr?.Title} to {currentQuote?.destinationCountry?.Title} </p>
            <p className="text-md"> SubTotal:  {(currentQuote?.smallBoxes * 20) + (currentQuote?.largeBoxes * 30)}</p>
            <p className="text-md"> Total Items: {currentQuote?.totalBoxes} </p>
            {currentQuote?.smallBoxes > 0 ? <p className="text-md"> Small Boxes: {currentQuote?.smallBoxes} </p> : null}
            {currentQuote?.largeBoxes > 0 ? <p className="text-md"> Small Boxes: {currentQuote?.largeBoxes} </p> : null}
        </div>

        <div>
           <p className="text-md">Collection Address: {currentQuote?.collectionAddress?.postalCode + ","+  currentQuote?.collectionAddress?.city } </p>
        </div>

        <div>
          <p className="text-md"> Delivery Address:{currentQuote?.deliveryAddress?.postalCode + ","+ currentQuote?.deliveryAddress?.city} </p>
        </div>

        <div>
            <p className="text-sm"> 
             Please note that we do not accept backpacks or duffel bags.
              For every item which exceeds the weight or size restrictions 
              you will be charged extra in 
              accordance with our terms and conditions.
             </p>
        </div>

       

    </div>

    
  );
}  
  