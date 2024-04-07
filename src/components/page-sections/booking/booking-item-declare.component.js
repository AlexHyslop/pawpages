import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BookingIndividualItem from './booking-individual-item';

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
          <BookingIndividualItem key={`large-box-${index}`} itemType={'Box/Parcel'} weight={'30kg'} height={'60cm'} length={'50cm'} width={'50cm'}/>
        ))}
        
        {/* Rendering small boxes */}
        {currentQuote && generateArray(currentQuote.smallBoxes).map((_, index) => (
          <BookingIndividualItem  key={`small-box-${index}`}itemType={'Box/Parcel'}  weight={'20kg'} height={'46cm'} length={'46cm'} width={'46cm'}/>
        ))}
 
      </div>
    </div>
  );
};

export default BookingItemDeclare;
