import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import CommodityForm from './booking-commodity.component';

const BookingIndividualItem = (props) => {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);



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
    setItem(prevItem => ({
      ...prevItem,
      commodityDetails: [...prevItem.commodityDetails, commodity]
    }));
  }
   

  return (
    <div className='flex flex-col rounded shadow-lg overflow-hidden p-5 m-5'>
      <h3> { (props.large ? 'Large Parcel ': 'Small Parcel ') + (props.index +1) }</h3>
      <div className='flex flex-row'>
        <p> {props.weight} - {props.height} x  {props.width} x  {props.length} </p> 
      </div>
      
      {item?.commodityDetails.map((commodity, index) => (
        <div key={index} className='flex flex-row'>
          <h3>Commodity {index + 1}</h3>
          <p>Commodity Code: {commodity.CommodityCode}</p>
          <p>Commodity Description: {commodity.CommodityDescription}</p>
          {/* <p>Country of Origin: {commodity.CountryOfOrigin.CountryCode}</p> */}
          <p>Number of Units: {commodity.NumberOfUnits}</p>
          <p>Unit Value: {commodity.UnitValue}</p>
          <p>Unit Weight: {commodity.UnitWeight}</p>
          {/* <p>Product Code: {commodity.ProductCode}</p> */}
          {commodity.ManufacturerAddress && (
            <div>
              <h4>Manufacturer Address</h4>
              <p>Company Name: {commodity.ManufacturerAddress.CompanyName}</p>
              <p>Address Line One: {commodity.ManufacturerAddress.AddressLineOne}</p>
              <p>Address Line Two: {commodity.ManufacturerAddress.AddressLineTwo}</p>
              <p>City: {commodity.ManufacturerAddress.City}</p>
              <p>County: {commodity.ManufacturerAddress.County}</p>
              <p>Postcode: {commodity.ManufacturerAddress.Postcode}</p>
              <p>Country: {commodity.ManufacturerAddress.Country.CountryCode}</p>
            </div>
          )}
        </div>
      ))}

  
      <CommodityForm onAdd={handleAddCommodity} />
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
  "CommodityDetails": [
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

