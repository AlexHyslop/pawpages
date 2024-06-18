import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BookingIndividualItem from './booking-individual-item'; 
import { useDispatch } from 'react-redux';
import quoteAction from '../../../store/actions/quote.action';
import { useNavigate } from 'react-router-dom'; 

const generateArray = (n) => Array.from({ length: n }, (_, index) => index);


const BookingItemDeclare = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);

  useEffect(() => {
    if(currentQuote){ 
      var quote = JSON.parse(JSON.stringify(currentQuote));
      quote.packages = [];  
      if(quote.largeBoxes && quote.largeBoxes != 0){
        for(var i = 0; i < quote.largeBoxes; i++){
          var newItem = {
            "Weight": 30.0,
            "Length": 50.0,
            "Width": 50.0,
            "Height": 60.0,
            "CommodityDetails": [] 
          }
          quote.packages.push(newItem); 
        }
      }

      if(quote.smallBoxes && quote.smallBoxes != 0){
        for(var i = 0; i < quote.smallBoxes; i++){
          var newItem = {
            "Weight": 20.0,
            "Length": 46.0,
            "Width": 46.0,
            "Height": 46.0,
            "CommodityDetails": [] 
          }
          quote.packages.push(newItem); 
        } 
      } 
      dispatch(quoteAction.updateCurrentQuote(quote));
    }
  }, []);
   
  
  const [item, setItem] = useState({
    weight: '',
    height: '',
    width: '',
    length: '',
    itemType: ''
  });

 
  const handleSubmit = (e) => { 
    e.preventDefault();
    // You can perform further actions with the item data here, such as sending it to a backend server
    console.log(item);
    // Reset the form after submission
    setItem({
      weight: '',
      height: '',
      width: '',
      length: '',
      itemType: ''
    });
  };
  

  return (
    <div className="max-w-7xl mx-auto pt-10 px-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Declare Items</h1>
        {/* Rendering large boxes */}
        {currentQuote?.packages?.map((item, index) => (
          <BookingIndividualItem commodityDetails={item.CommodityDetails} large={item.Weight ==30.0} index={index} key={`box-${index}`} itemType={'Box/Parcel'} weight={item.Weight+'kg'} height={item.Height+'cm'} length={item.Length+'cm'} width={item.Width+'cm'}/>
        ))} 

      <div className='col-span-2 text-right'>
        <input className="button col-span-2 mt-4 w-full mx-auto block" type="submit" value="Continue" onClick={(e) => { navigate('/pay')}}/>
      </div>
 
    </div>
  );
};

export default BookingItemDeclare;




// "Packages": [
//   {
//       "Weight": 25.0,
//       "Length": 30.0,
//       "Width": 20.0,
//       "Height": 10.0,
//       "CommodityDetails": [
//           {
//               "CommodityCode": "8708999790",
//               "CommodityDescription": "Car Batteries",
//               "CountryOfOrigin": {
//                   "CountryCode": "DE"
//               },
//               "NumberOfUnits": 5,
//               "UnitValue": 15.5,
//               "UnitWeight": 4.0,
//               "ProductCode": "YourProductCode",
//               "ManufacturerAddress": {
//                   "CompanyName": "[MANUFACTURER ADDRESS COMPANY NAME]",
//                   "AddressLineOne": "[MANUFACTURER ADDRESS LINE 1]",
//                   "AddressLineTwo": "[MANUFACTURER ADDRESS LINE 2]",
//                   "City": "[MANUFACTURER ADDRESS CITY]",
//                   "County": "[MANUFACTURER ADDRESS COUNTY]",
//                   "Postcode": "[MANUFACTURER ADDRESS POSTCODE]",
//                   "Country": {
//                       "CountryCode": "GB"
//                   }
//               }
//           },
//           {
//               "CommodityCode": "8708301040",
//               "CommodityDescription": "Brake Pads",
//               "CountryOfOrigin": {
//                   "CountryCode": "FR"
//               },
//               "NumberOfUnits": 2,
//               "UnitValue": 11.0,
//               "UnitWeight": 2.5,
//               "ProductCode": "YourProductCode2"
//           }
//       ]
//   },
//   {
//       "Weight": 3.5,
//       "Length": 47.98,
//       "Width": 45.62,
//       "Height": 12.5,
//       "CommodityDetails": [
//           {
//               "CommodityCode": "8708951010",
//               "CommodityDescription": "Air Bag",
//               "CountryOfOrigin": {
//                   "CountryID": 231
//               },
//               "NumberOfUnits": 1,
//               "UnitValue": 35.78,
//               "UnitWeight": 3.5,
//               "ProductCode": "YourProductCode3",
//               "ManufacturerAddress": {
//                   "CompanyName": "[MANUFACTURER ADDRESS COMPANY NAME]",
//                   "AddressLineOne": "[MANUFACTURER ADDRESS LINE 1]",
//                   "AddressLineTwo": "[MANUFACTURER ADDRESS LINE 2]",
//                   "City": "[MANUFACTURER ADDRESS CITY]",
//                   "County": "[MANUFACTURER ADDRESS COUNTY]",
//                   "Postcode": "[MANUFACTURER ADDRESS POSTCODE]",
//                   "Country": {
//                       "CountryID": 232
//                   }
//               }
//           }
//       ]
//   }
// ] 