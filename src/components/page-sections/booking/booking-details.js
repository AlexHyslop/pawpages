import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import QuoteDisplay from "../quotes/quote-display.component";
import BookingAddress from "./booking-address";
 
export default function BookingDetails(props) {
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
        {/* loops through small + large boxes and use api code to specify contents + sign non illegal items  */}
    </div>
  );
}  
  