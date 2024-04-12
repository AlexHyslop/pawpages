import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const BookingIndividualItem = (props) => {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);

  const [item, setItem] = useState({ 
    itemType: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

   
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
      <div>
        <label htmlFor="itemType" className="block text-sm font-medium text-gray-700">Item Type</label>
        <select
          id="itemType"
          name="itemType"
          value={item.itemType}
          onChange={handleInputChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Contents</option>
          <option value="Type 1">Type 1</option>
          <option value="Type 2">Type 2</option>
          <option value="Type 3">Type 3</option>
          {/* Add more options as needed */}
        </select>
    </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add Item
        </button>
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
          "ProductCode": "YourProductCode",
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

