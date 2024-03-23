import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import QuoteDisplay from "../../quotes/quote-display.component";
import BookingAddress from "./booking-address";
 
export default function BookingDashboard(props) {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [currentStage, setCurrentStage] = React.useState(1); 
  
  const incrementStage = () => {
    console.log("incrementCalledFromChild")
    console.log("currentStage", currentStage)
    setCurrentStage(currentStage + 1);
  };

  return (
    <div style={{display: 'flex', flexDirection:'column'}}>
        <button disabled={currentStage == 1} onClick={(e) => { setCurrentStage(currentStage - 1)}}>Back</button>
        <button  disabled={currentStage == 2}  onClick={(e) => { setCurrentStage(currentStage + 1)}}>Next</button>
        {/* { currentStage == 1 ?   <BookingAddress type="collection" incrementStage={incrementStage} /> 
         :  <BookingAddress type="delivery" incrementStage={incrementStage} /> } */}
        <QuoteDisplay />
    </div>
  );
}  
  