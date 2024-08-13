import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from "react-redux"; 
import { addDays, addMinutes, format, isSaturday, isSunday} from 'date-fns';
import quoteAction from '../../../store/actions/quote.action';




export default function BookingCollectionTime(props) { 
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);  
  const [selectedDate, setSelectedDate] = useState('');
  // const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
 
  useEffect(() => {  
    var tempQuote = JSON.parse(JSON.stringify(currentQuote));
    if(tempQuote.expressSelected != undefined || tempQuote.expressSelected != null){
      if(tempQuote.expressSelected){
        tempQuote.selectedServiceResult = tempQuote.ServiceResults?.filter(res => res.ServiceName === 'TG Express Worldwide');
      }else { 
        tempQuote.selectedServiceResult = tempQuote.ServiceResults?.filter(res => res.ServiceName === 'TG International Economy');
      }
    }
    dispatch(quoteAction.updateCurrentQuote(  tempQuote ));    

  }, []); 
  
  const handleDateChange = (e) => {
    const selected = e.target.value;
    const selectedDateTime = new Date(selected);

    if (isSaturday(selectedDateTime) || isSunday(selectedDateTime)) {
        setError('Saturdays and Sundays are not allowed.');
    } else {
        setSelectedDate(selected);
        setError('');
    }
};
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDateTime = new Date(`${selectedDate}`);
    const currentTime = new Date();

    if(!selectedDate){
      setError('Please select date.')
      return; 
    }
    if (selectedDateTime < currentTime) {
      setError('Please select a date and time in the future.');
      return;
    }
    
    setError(''); 

    const deepCopyQuote = { ...currentQuote };
    deepCopyQuote.collectionDate = selectedDate; 
    dispatch(quoteAction.updateCurrentQuote(deepCopyQuote)); 
    navigate("/items"); 
  };

  const getTomorrow = () => {
    let tomorrow = addDays(new Date(), 1);
    
    // Skip weekends
    while (isSaturday(tomorrow) || isSunday(tomorrow)) {
      tomorrow = addDays(tomorrow, 1);
    }

    return format(tomorrow, 'yyyy-MM-dd');
};


return (
  <div className="col-span-3">
      <form onSubmit={handleSubmit} className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4 max-w-40">
              <label htmlFor="date" className="block text-gray-700">Select a Date:</label>
              <input 
                  type="date" 
                  id="date" 
                  value={selectedDate} 
                  onChange={handleDateChange} 
                  min={getTomorrow()} 
                  className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200" 
              />
          </div> 
          <div className="mb-4">
              <label htmlFor="time" className="block text-gray-700">Collection will be between 9:00am and 17:30pm on selected date.</label>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="button mt-4">Submit</button>
      </form>
  </div>
);
}


 
   