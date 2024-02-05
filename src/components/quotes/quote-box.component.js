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
  
  const handleAddBoxToQuote = () => {
    var deepCopyQuote = JSON.parse(JSON.stringify(currentQuote)); 
    if(props.type == "smallBox"){
        deepCopyQuote.smallBoxes += 1; 
    } else if(props.type == "largeBox"){
        deepCopyQuote.largeBoxes += 1;
    }
    deepCopyQuote.totalBoxes += 1;
     dispatch(quoteAction.updateQuote(deepCopyQuote));
  };

  const handleAddRemoveToQuote = () => {
    var deepCopyQuote = JSON.parse(JSON.stringify(currentQuote)); 
    if(props.type == "smallBox"){
        deepCopyQuote.smallBoxes -= 1; 
    } else if(props.type == "largeBox"){
        deepCopyQuote.largeBoxes -= 1;
    }
    deepCopyQuote.totalBoxes -= 1;
     dispatch(quoteAction.updateQuote(deepCopyQuote));
  };
  

   
  return (
    <div className="container">
        <box> {props.displayName} </box>
        <box> {props.weight} </box>
        <button disabled={amountSelected == 0}
         onClick={() => {
            setAmountSelected(amountSelected-1);
            handleAddRemoveToQuote();
        }}> removeIcon </button>
        <button> {amountSelected} </button>
        <button disabled={currentQuote?.totalBoxes >= 5} onClick={() => {
            setAmountSelected(amountSelected+1);
            handleAddBoxToQuote()}
        }> addIcon </button>
        <box> {props.price} </box> 
    </div>
  );
}  
  