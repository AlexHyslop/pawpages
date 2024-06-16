import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from "react-redux"; 
import { addDays, addMinutes, format} from 'date-fns';
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
    setSelectedDate(e.target.value);
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
    // Do something with the selected date and time
    console.log('Selected Date:', selectedDate);
    setError(''); 

    const deepCopyQuote = { ...currentQuote };
    deepCopyQuote.collectionDate = selectedDate; 
    dispatch(quoteAction.updateCurrentQuote(deepCopyQuote)); 
    navigate("/items"); 
  };

  const getTomorrow = () => {
    const tomorrow = addDays(new Date(), 1);
    return format(tomorrow, 'yyyy-MM-dd');
  };

  const getTimes = () => {
    const tomorrow = addDays(new Date(), 1);
    const start = new Date(tomorrow.setHours(9, 0, 0)); // 9:00 AM
    const end = new Date(tomorrow.setHours(17, 30, 0)); // 5:30 PM
    return eachHalfHourBetween(start, end).map(date => date.toISOString().slice(11,16));
  };

  const eachHalfHourBetween = (start, end) => {
    const interval = 30; // 30 minutes
    const times = [];
  
    let current = start;
  
    while(current <= end) {
      times.push(current);
      current = addMinutes(current, interval);
    }
  
    return times;
  }; 
  

  return (
    <div className="col-span-3">
      <form onSubmit={handleSubmit} className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 max-w-40">
          <label htmlFor="date" className="block text-gray-700">Select a Date:</label>
          <input type="date" id="date" value={selectedDate} onChange={handleDateChange} min={getTomorrow()} className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200" />
        </div>
        {/* <div className="mb-4 max-w-40">
          <label htmlFor="time" className="block text-gray-700">Select a Time:</label>
          <select id="time" value={selectedTime} onChange={handleTimeChange} className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200">
            {getTimes().map(time => <option key={time} value={time}>{time}</option>)}
          </select>
        </div> */}
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700">Collection will be between 9:00am and 17:30pm on selected date.</label>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="button mt-4">Submit</button>
      </form>
    </div>
  );
}

/*
CollectionOptions": [
                {
                    "CollectionOptionID": 52,
                    "CollectionOptionTitle": "DHLParcelMulti",
                    "CollectionCharge": 12.90,
                    "SameDayCollectionCutOffTime": null,
                    "ExpectedLabel": {
                        "LabelRole": "Collection",
                        "LabelFormat": "PDF",
                        "LabelGenerateStatus": "LabelGenerated",
                        "AvailableSizes": [
                            {
                                "Size": "A4"
                            },
                            {
                                "Size": "Thermal"
                            }
                        ]
                    }
                },



                "CollectionOptions": [
                {
                    "CollectionOptionID": 52,
                    "CollectionOptionTitle": "DHLParcelMulti",
                    "CollectionCharge": 12.90,
                    "SameDayCollectionCutOffTime": null,
                    "ExpectedLabel": {
                        "LabelRole": "Collection",
                        "LabelFormat": "PDF",
                        "LabelGenerateStatus": "LabelGenerated",
                        "AvailableSizes": [
                            {
                                "Size": "A4"
                            },
                            {
                                "Size": "Thermal"
                            }
                        ]
                    }
                },
*/
 
  