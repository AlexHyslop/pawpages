import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const generateArray = (n) => Array.from({ length: n }, (_, index) => index);

const BookingItemDeclare = () => {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);

  const [item, setItem] = useState({
    weight: '',
    height: '',
    width: '',
    length: '',
    itemType: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

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
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Declare Items</h2>
      <div className="space-y-4 flex flexrow">
        {/* Rendering large boxes */}
        {currentQuote && generateArray(currentQuote.largeBoxes).map((_, index) => (
          <div key={`large-box-${index}`} className="large-box">Large Box {index + 1}</div>
        ))}
        
        {/* Rendering small boxes */}
        {currentQuote && generateArray(currentQuote.smallBoxes).map((_, index) => (
          <div key={`small-box-${index}`} className="small-box">Small Box {index + 1}</div>
        ))}
 
      </div>
    </div>
  );
};

export default BookingItemDeclare;
