import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const BookingIndividualItem = (props) => {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);

  const [item, setItem] = useState({ 
    itemType: '',
    commodityDetails: []
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newCommodityDetails = [...item.commodityDetails];
    newCommodityDetails[index] = { ...newCommodityDetails[index], [name]: value };
    setItem({ ...item, commodityDetails: newCommodityDetails });
  };

  const handleAddCommodity = () => {
    setItem({ ...item, commodityDetails: [...item.commodityDetails, {}] });
  };

  useEffect(() => {
    if (props.commodityDetails) {
      setItem({ ...item, commodityDetails: props.commodityDetails });
    }
  }, [props.commodityDetails]);
   
  return (
    <> 
      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
        <p className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        > {props.weight} </p>
      </div>
      <div>
        <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
        <p  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" > 
        {props.height} </p>
      </div>

      <div>
        <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width</label>
        <p
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        > {props.width} </p>
      </div>
      <div>
        <label htmlFor="length" className="block text-sm font-medium text-gray-700">Length</label>
        <p
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >{props.length} </p>
      </div>
      
      {item?.commodityDetails.map((commodity, index) => (
        <div key={index}>
          <h3>Commodity {index + 1}</h3>
          <p>Commodity Code: {commodity.CommodityCode}</p>
          <p>Commodity Description: {commodity.CommodityDescription}</p>
          <p>Country of Origin: {commodity.CountryOfOrigin.CountryCode}</p>
          <p>Number of Units: {commodity.NumberOfUnits}</p>
          <p>Unit Value: {commodity.UnitValue}</p>
          <p>Unit Weight: {commodity.UnitWeight}</p>
          <p>Product Code: {commodity.ProductCode}</p>
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

      <div>
        <button onClick={handleAddCommodity}>Add New Item</button> 
      </div>
    </>
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

