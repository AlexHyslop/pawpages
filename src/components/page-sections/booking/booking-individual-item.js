import React, { useState } from 'react';
import { useEffect } from 'react';
import CommodityForm from './booking-commodity.component';
import { XMarkIcon } from '@heroicons/react/20/solid' 
import { TGE_ENDPOINTS } from '../../../api/transglobal.service';
import { useDispatch, useSelector } from "react-redux";
import quoteAction from '../../../store/actions/quote.action';

const BookingIndividualItem = (props) => {
  const dispatch = useDispatch();  
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);
  const [errorMessage, setErrorMessage] = React.useState(null); 

  const [item, setItem] = useState({ 
    itemType: '',
    commodityDetails: []
  });
 
  useEffect(() => {
    if (props.commodityDetails) {
      setItem({ ...item, commodityDetails: props.commodityDetails });
    }
  }, [props.commodityDetails]);

  const handleAddCommodity = (commodity) => {
    // call from child component with commodity details 
    console.log("commodity passed to parent", commodity); 
    TGE_ENDPOINTS.getCommodity( 
      { 
        "Searches": [
              {
                  "Description": commodity.Name
              }
          ],
        "MessageLanguage": "EN",
        "CountryCode": "GB",
        "NumberOfResults": 5
      },
      commodity,
      onGetCommodity);
  }

  const onGetCommodity = (response, commodity) => {
    setErrorMessage(null);  

    if(response && response.data && response.data.Status == "SUCCESS"){
      console.log("got inside iff statement")

      console.log("Selected code check", response.data.SearchResults[0].Results[0].CommodityCode); 
      console.log("Selected description check", response.data.SearchResults[0].Results[0].CommodityDescription); 

      commodity.CommodityCode = response.data.SearchResults[0].Results[0].CommodityCode;
      commodity.CommodityDescription = response.data.SearchResults[0].Results[0].CommodityDescription; 
 

      setItem(prevItem => ({
        ...prevItem,
        commodityDetails: [...prevItem.commodityDetails, commodity]
      })); 
      
      const deepCopyQuote = { ...currentQuote };
      deepCopyQuote.packages[props.index].CommodityDetails.push(commodity);
      dispatch(quoteAction.updateCurrentQuote(deepCopyQuote)); 

    }else{
      setErrorMessage("Commodity not found, try a different phrase.")
    }
    
  }
   
  function handleRemoveCommodity(index) {
    const newCommodities = [...item.commodityDetails];
    newCommodities.splice(index, 1);
    setItem({ ...item, commodityDetails: newCommodities }); 

    const deepCopyQuote = { ...currentQuote };
    deepCopyQuote.packages[props.index].CommodityDetails = newCommodities;
    dispatch(quoteAction.updateCurrentQuote(deepCopyQuote)); 

  }
  
  return (
    <div className='grid xl:grid-cols-4 gap-8 mt-8'>
    <div className=''>
      <CommodityForm onAdd={handleAddCommodity} />
    </div>
    <div className='col-span-3'>
      <h3 className='border-b-2 border-secondary pb-2 text-xl mb-2'> { (props.large ? 'Large Parcel ': 'Small Parcel ') + (props.index +1) }</h3>
      <div className='flex flex-row'>
        <p> {props.weight} - {props.height} x  {props.width} x  {props.length} </p> 
      </div>
      
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} 

      {props?.commodityDetails?.map((commodity, index) => (
        <div key={index} className='border-2 grid-cols-6 gap-4 p-4 mb-4'>
          <div className='mb-4 grid lg:grid-cols-6 gap-2 relative'> 
            <div className='text-center'>
                <p>Commodity Code:</p>
                <span className='text-secondary'>{commodity.CommodityCode}</span>
            </div>
            <div className='text-center'>
                <p>Description:</p>
                <span className='text-secondary'>{commodity.CommodityDescription}</span>
                {/* <p>Country of Origin: {commodity.CountryOfOrigin.CountryCode}</p> */}
            </div>
            <div className='text-center'>
               <p>Number of Units:</p>
               <span className='text-secondary'>{commodity.NumberOfUnits}</span>
            </div>
            <div className='text-center'>
                <p>Unit Value:</p>
                <span className='text-secondary'>£{commodity.UnitValue}</span>
            </div>
            <div className='text-center'>
                <p>Unit Weight:</p>
                {/* <p>Product Code: {commodity.ProductCode}</p> */}
                <span className='text-secondary'>{commodity.UnitWeight}kg</span>
            </div>
            <div className='absolute -right-2 top-5'>
              <XMarkIcon className='h-6 text-lg cursor-pointer text-red-700' onClick={() => handleRemoveCommodity(index)} />
            </div>
            {commodity.ManufacturerAddress && (
              <div className='mb-4 grid grid-cols-6 gap-4'>
                <h4>Manufacturer Address</h4>
                <div className='text-center'>
                  <span className='text-secondary'></span>
                </div>
                <div className='text-center'>
                  <p>Company Name:</p>
                  <span className='text-secondary'>{commodity.ManufacturerAddress.CompanyName}</span>
                </div>
                <div className='text-center'>
                  <p>Address Line One:</p>
                  <span className='text-secondary'>{commodity.ManufacturerAddress.AddressLineOne}</span>
                </div>
                <div className='text-center'>
                  <p>Address Line Two:</p>
                  <span className='text-secondary'>{commodity.ManufacturerAddress.AddressLineTwo}</span>
                </div>
                <div className='text-center'>
                  <p>City:</p>
                  <span className='text-secondary'>{commodity.ManufacturerAddress.City}</span>
                </div>
                <div className='text-center'>
                  <p>County:</p>
                  <span className='text-secondary'>{commodity.ManufacturerAddress.County}</span>
                </div>
                <div className='text-center'>
                  <p>Postcode:</p>
                  <span className='text-secondary'>{commodity.ManufacturerAddress.Postcode}</span>
                </div>
                <div className='text-center'>
                  <p>Country: </p>
                  <span className='text-secondary'>{commodity.ManufacturerAddress.Country.CountryCode}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

    </div>
  );
};

export default BookingIndividualItem;

/*
{
  "Weight": 25.0,
  "Length": 30.0,
  "Width": 20.0,
  "Height": 10.0,
  "commodityDetails": [
      {
          "CommodityCode": "8708999790",
          "CommodityDescription": "Car Batteries",
          "CountryOfOrigin": {
              "CountryCode": "DE"
          },
          "NumberOfUnits": 5,
          "UnitValue": 15.5,
          "UnitWeight": 4.0,
          1
          "ManufacturerAddress": {
              "CompanyName": "[MANUFACTURER ADDRESS COMPANY NAME]",
              "AddressLineOne": "[MANUFACTURER ADDRESS LINE 1]",
              "AddressLineTwo": "[MANUFACTURER ADDRESS LINE 2]",
              "City": "[MANUFACTURER ADDRESS CITY]",
              "County": "[MANUFACTURER ADDRESS COUNTY]",
              "Postcode": "[MANUFACTURER ADDRESS POSTCODE]",
              "Country": {
                  "CountryCode": "GB"
              }
          }
      },
      {
          "CommodityCode": "8708301040",
          "CommodityDescription": "Brake Pads",
          "CountryOfOrigin": {
              "CountryCode": "FR"
          },
          "NumberOfUnits": 2,
          "UnitValue": 11.0,
          "UnitWeight": 2.5,
          "ProductCode": "YourProductCode2"
      }  
*/

