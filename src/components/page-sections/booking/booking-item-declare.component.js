import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BookingIndividualItem from './booking-individual-item'; 
import { useDispatch } from 'react-redux';
import quoteAction from '../../../store/actions/quote.action';

const generateArray = (n) => Array.from({ length: n }, (_, index) => index);

const BookingItemDeclare = () => {
  const dispatch = useDispatch(); 
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);

  useEffect(() => {
    if(currentQuote){ 
      var quote = JSON.parse(JSON.stringify(currentQuote));
      quote.items = [];  
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
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Declare Items</h2>
        {/* Rendering large boxes */}
        {currentQuote && generateArray(currentQuote.largeBoxes).map((_, index) => (
          <BookingIndividualItem large={true} index={index} key={`large-box-${index}`} itemType={'Box/Parcel'} weight={'30kg'} height={'60cm'} length={'50cm'} width={'50cm'}/>
        ))}
        
        {/* Rendering small boxes */}
        {currentQuote && generateArray(currentQuote.smallBoxes).map((_, index) => (
          <BookingIndividualItem large={false} index={index} key={`small-box-${index}`}itemType={'Box/Parcel'}  weight={'20kg'} height={'46cm'} length={'46cm'} width={'46cm'}/>
        ))}
 
    </div>
  );
};

export default BookingItemDeclare;

