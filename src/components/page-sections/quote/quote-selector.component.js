import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import quoteAction from "../../../store/actions/quote.action"; 

export default function QuoteSelector(props) {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);  
  const economyRates = useSelector((state) => state?.rates?.economyRates);  
  const expressRates = useSelector((state) => state?.rates?.expressRates);  
  const [expressRate, setExpressRate] = React.useState(null);
  const [economyRate, setEconomyRate] = React.useState(null);
  const [chargeableWeight, setChargeableWeight] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  

  useEffect(() => {  
    console.log("use effect quotes")
    if (economyRates !== null) {
      figureOutQuoteByCountryRates();
    }
    
    if (expressRates !== null) {
      figureOutQuoteByCountryRates();
    }
  },  []);


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

      setEconomyRate(setRateValues(economyRates, countryCode, totalWeight));
      setExpressRate(setRateValues(expressRates, countryCode, totalWeight));
      setChargeableWeight(totalWeight); 

      // for (var key in expressRates) {
      //   if (key.includes(countryCode)) {
      //     console.log("Got express rates for country code", countryCode, ":", expressRates[key][totalWeight]);
      //     setExpressRate(expressRates[key][totalWeight]);
      //     break;  
      //   }
      // }


    } 
  }

  function setRateValues(rates, countryCode, totalWeight){
    console.log("rate processed", rates, countryCode, totalWeight)
    for (var key in rates) {
      if (key.includes(countryCode)) {
        var rateByKey = rates[key];  
        var price = rateByKey[totalWeight]; 
        return price; 
      }
    }

    return null; 
  }
 
  const onSelectQuote = (price, expressSelected) => {
    var tempQuote = JSON.parse(JSON.stringify(currentQuote));
    tempQuote.actualPrice = price;
    tempQuote.expressSelected = expressSelected;
     dispatch(quoteAction.updateCurrentQuote(tempQuote));   
    navigate("/booking");
   }; 


 
   //DHL economy is a road service
   //DHL express world wide is air, (won't use)

   //TG economy air
   //TG Express world wide is air 

   //dont care about chargeable weight
   //warehouse service
   //only show total cost

   //optional extras
   //always next day collection 
   //always accept free upto £50 (maybe £100)

   //duty paid, depends on the the items commodity codes + value of the goods. They must pay when it arrives at destination you can't get quoted duty until its at the end,
   // you cant get an exact price

   //user declares their value,
   //shipping price 
   //default transglobal put buy price but we put sell price

   //alter intial total cost with margin, based on shipping cost 
   //rates will come as buying vs sell 
   //within kilo brackets different costs, whatever bracket + 


   //use doesn't need to see it, only see it if they look at the label 
   //we will alter the shipping price
   //total value customs = shipping price is, quoted shipping price from tge + our buy price + declared

   //always collect but choose when they pickup
   
   return ( 
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
         <th scope="col" class="px-6 py-3">Service</th> 
         <th scope="col" class="px-6 py-3">Detail</th>
         <th scope="col" class="px-6 py-3">Collection</th> 
         <th scope="col" class="px-6 py-3">Insurance</th>
         <th scope="col" class="px-6 py-3">Price (£)</th> 
         <th scope="col" class="px-6 py-3"></th>
        </thead>
        <tbody> 
          {expressRate != null ? 
            <tr> 
              <td>  
                <i class="fa-brands fa-dhl text-6xl text-red-500"/>  
                <i class="fa-solid fa-truck-fast text-2xl text-yellow-500" /> 
              </td> 
              <td> {currentQuote.collectionCountry.Title} to  {currentQuote.destinationCountry.Title} </td>
              <td> Free </td> 
              <td> £50 Free </td>
              <td> £{expressRate} </td> 
              <td> <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={(e) => onSelectQuote(expressRate, true) }> Select </button></td>
            </tr>
          : null}
          {economyRate != null ? 
            <tr>
              <td> <i class="fa-brands fa-dhl text-6xl text-red-500"/> </td>
              <td> {currentQuote.collectionCountry.Title} to  {currentQuote.destinationCountry.Title} </td>
              <td> Free </td> 
              <td> £50 Free </td>
              <td> £{economyRate} </td>
              <td> <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={(e) => onSelectQuote(economyRate, false)}> Select </button></td>
            </tr>
          : null} 
        </tbody>
      </table>
      </div>
  );
};
 