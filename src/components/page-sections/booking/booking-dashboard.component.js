import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import QuoteDisplay from "../../quotes/quote-display.component";
import BookingAddress from "./booking-address";
import BookingItemDeclare from "./booking-item-declare.component";
import BookingCollectionTime from "./booking-collection-time.component";

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
    <>
      <div className="flex gap-6 w-full text-center items-center justify-center bg-secondary p-6">
          <button className={`p-2 px-4 rounded-full hover:bg-white hover:text-primary ${currentStage === 1 ? 'bg-white text-primary' : 'text-white'}`} disabled={currentStage === 1} onClick={(e) => { setCurrentStage(1)}}><i class="fa-solid fa-1"></i> - Collection Address</button>
          <button className={`p-2 px-4 rounded-full hover:bg-white hover:text-primary ${currentStage === 2 ? 'bg-white text-primary' : 'text-white'}`} disabled={currentStage === 2} onClick={(e) => { setCurrentStage(2)}}><i class="fa-solid fa-2"></i> - Delivery Address</button>
          <button className={`p-2 px-4  rounded-full hover:bg-white hover:text-primary ${currentStage === 3 ? 'bg-white text-primary' : 'text-white'}`} disabled={currentStage === 3} onClick={(e) => { setCurrentStage(3)}}><i class="fa-solid fa-3"></i> - Collection Time</button>
        </div>
      <div className="container mx-auto mt-14 px-6 lg:px-8" style={{display: 'flex', flexDirection:'column'}}>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-10 border p-6">
            { currentStage == 1 ?  
              <BookingAddress type="collection" incrementStage={incrementStage} /> :
              currentStage == 2 ? 
              <BookingAddress type="delivery" incrementStage={incrementStage} /> :
              currentStage == 3 ? 
              <BookingCollectionTime />
              :
              <BookingItemDeclare/> 
              }           
              <QuoteDisplay />
        </div>
          
      </div>
    </>
  );
}  
  