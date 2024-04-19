import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import quoteAction from "../../store/actions/quote.action";
 
export default function QuoteDisplay(props) {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);  
  const economyRates = useSelector((state) => state?.rates?.economyRates);  
  const expressRates = useSelector((state) => state?.rates?.expressRates);  
  const [expressRate, setExpressRate] = React.useState(null);
  const [economyRate, setEconomyRate] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  

  useEffect(() => {  
    console.log("use effect quotes")
    figureOutQuoteByCountryRates();
  }, []);

  function figureOutQuoteByCountryRates(){
    var totalWeight = 0;
    if(currentQuote){
      if(currentQuote.largeBoxes){
        totalWeight +=  (currentQuote.largeBoxes * 30); 
      }
      if(currentQuote.smallBoxes){
        totalWeight +=  (currentQuote.smallBoxes * 30);  
      } 
 
      var countryCode = currentQuote.destinationCountry.CountryCode;  

      for (var key in economyRates) {
        if (key.includes(countryCode)) {
          // console.log("Got express rates for country code", countryCode, ":", economyRates[key][totalWeight]);
          setEconomyRate(economyRates[key][totalWeight]);
          break;  
        }
      }

      for (var key in expressRates) {
        if (key.includes(countryCode)) {
          // console.log("Got express rates for country code", countryCode, ":", expressRates[key][totalWeight]);
          setEconomyRate(expressRates[key][totalWeight]);
          break;  
        }
      } 
      
      console.log("total weight ", totalWeight);  
 
    } 
  }
  

  return (
    <div className="quote-display"> 
        <div className="p-6 text-md text-gray-700 bg-gray-50" style={{display:'flex', flexDirection:'column'}}> 
            <h2 className="text-lg underline"> Order Details </h2>
            <p className="text-md"> From: {currentQuote?.collectionCountr?.Title} to {currentQuote?.destinationCountry?.Title} </p>
            <p className="text-md"> SubTotal:  {(currentQuote?.smallBoxes * 20) + (currentQuote?.largeBoxes * 30)}</p>
            <p className="text-md"> Total Items: {currentQuote?.totalBoxes} </p>
            {currentQuote?.smallBoxes > 0 ? <p className="text-md"> Small Boxes: {currentQuote?.smallBoxes} </p> : null}
            {currentQuote?.largeBoxes > 0 ? <p className="text-md"> Small Boxes: {currentQuote?.largeBoxes} </p> : null}
            <hr className="mb-4"></hr>
            <div>
              <p className="text-md">Collection Address: {currentQuote?.collectionAddress?.postalCode + ","+  currentQuote?.collectionAddress?.city } </p>
            </div>
            <div>
              <p className="text-md"> Delivery Address:{currentQuote?.deliveryAddress?.postalCode + ","+ currentQuote?.deliveryAddress?.city} </p>
            </div>
        </div>

        

        <div>
            <p className="text-xs p-6"> 
             Please note that we do not accept backpacks or duffel bags.
              For every item which exceeds the weight or size restrictions 
              you will be charged extra in 
              accordance with our terms and conditions.
             </p>
        </div>

       

    </div>

    
  );
}  
  