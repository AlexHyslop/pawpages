import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import quoteAction from "../../store/actions/quote.action";
 
export default function QuoteBox(props) {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [amountSelected, setAmountSelected] = React.useState(0);  
  
 
  const handleGetQuotes = () => {
    dispatch(quoteAction.updateQuote({
       currentQuote : { 
       }
     }));   

   }; 

  return (
    <div>
        <box> {props.type} </box>
        <box> {props.weight} </box>
        <button disabled={amountSelected == 0} onClick={() => {setAmountSelected(amountSelected-1)}}> removeIcon </button>
        <button> {amountSelected} </button>
        <button onClick={() => {setAmountSelected(amountSelected+1)}}> addIcon </button>
        <box> {props.price} </box> 
    </div>
  );
}  
  