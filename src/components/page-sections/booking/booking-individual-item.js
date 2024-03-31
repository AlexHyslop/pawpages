import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const BookingIndividualItem = () => {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);

  const [item, setItem] = useState({
    weight: '',
    height: '',
    width: '',
    length: '',
    itemType: ''
  });

   
  return (
    <> 
      <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={item.weight}
            onChange={handleInputChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
          <input
            type="text"
            id="height"
            name="height"
            value={item.height}
            onChange={handleInputChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width</label>
          <input
            type="text"
            id="width"
            name="width"
            value={item.width}
            onChange={handleInputChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-700">Length</label>
          <input
            type="text"
            id="length"
            name="length"
            value={item.length}
            onChange={handleInputChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
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
            <option value="">Select an Item Type</option>
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



