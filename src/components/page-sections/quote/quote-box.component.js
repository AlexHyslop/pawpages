import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import quoteAction from "../../../store/actions/quote.action";
 
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
    dispatch(quoteAction.updateCurrentQuote(deepCopyQuote));
  };

  const handleAddRemoveToQuote = () => {
    var deepCopyQuote = JSON.parse(JSON.stringify(currentQuote)); 
    if(props.type == "smallBox"){
        deepCopyQuote.smallBoxes -= 1; 
    } else if(props.type == "largeBox"){
        deepCopyQuote.largeBoxes -= 1;
    }
    deepCopyQuote.totalBoxes -= 1;
     dispatch(quoteAction.updateCurrentQuote(deepCopyQuote));
  };
  

   
  return (

    <div>
        <label className="block text-sm font-extrabold leading-6 text-primary text-left">
            {props.displayName} 
        </label>
   
        <div className="flex flex-row justify-around">  
            {props.type == "smallBox" ? <i class="fa-solid fa-box-open text-3xl text-slate-400 m-3"/> :  <i class="fa-solid fa-cubes text-3xl text-slate-400 m-3"/>  }
          
            <div className="flex flex-col">
                <p className="text-base pt-2"> {props.weight} (max) </p>
                <p className="text-sm"> {props.maxHeight +" " + props.maxWidth + " "+ props.maxLength } </p> 
            </div>


            <div className="flex flex-row ml-5 pt-3"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className={`m-1 w-6 h-6 ${amountSelected === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${amountSelected < 0 ? 'text-red-500' : ''}`}
                    onClick={() => {
                        if (amountSelected > 0) {
                            setAmountSelected(amountSelected - 1);
                            handleAddRemoveToQuote();
                        }
                    }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg> 
                <p className="pt-1"> {amountSelected} </p> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="m-1 w-6 h-6"
                    onClick={() => {
                        if (currentQuote?.totalBoxes < 5) {
                        setAmountSelected(amountSelected + 1);
                        handleAddBoxToQuote();
                        }
                    }}
                    disabled={currentQuote?.totalBoxes >= 5}
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg> 
            </div>
        </div>
    </div>
  );
}  
  