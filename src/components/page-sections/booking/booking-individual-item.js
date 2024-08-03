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
  const [loading, setLoading] = React.useState(false); 
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
    commodity.CommodityCode = commodity.CommodityCode.padEnd(8, '0');
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
      setLoading(true);
  }

  const onGetCommodity = (response, commodity) => {
    setLoading(false);
    setErrorMessage(null);  

    if(response && response.data && response.data.Status == "SUCCESS"){
      commodity.CommodityCode = response.data.SearchResults[0].Results[0].CommodityCode.padEnd(8, '0');
      commodity.CommodityDescription = response.data.SearchResults[0].Results[0].CommodityDescription; 
      commodity.CountryOfOrigin = { CountryCode: 'GB' }; 
      
      console.log("commodity", commodity);
      setItem(prevItem => ({
        ...prevItem,
        commodityDetails: [...prevItem.commodityDetails, commodity]
      })); 
     
      const deepCopyQuote = { ...currentQuote };
      deepCopyQuote.packages[props.index].CommodityDetails.push(commodity);
      console.log("logging quote before add commodity" , deepCopyQuote);
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

      {loading && <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
      </div>
      }

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

