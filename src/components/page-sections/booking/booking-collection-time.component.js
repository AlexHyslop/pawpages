import React, { useState } from 'react';

const BookingCollectionTime = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const currentTime = new Date();
    if (selectedDateTime < currentTime) {
      setError('Please select a date and time in the future.');
      return;
    }
    // Do something with the selected date and time
    console.log('Selected Date:', selectedDate);
    console.log('Selected Time:', selectedTime);
    setError('');
  };

  return (
    <div className="col-span-3">
      <form onSubmit={handleSubmit} className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 max-w-40">
          <label htmlFor="date" className="block text-gray-700">Select a Date:</label>
          <input type="date" id="date" value={selectedDate} onChange={handleDateChange} className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200" />
        </div>
        <div className="mb-4 max-w-40">
          <label htmlFor="time" className="block text-gray-700">Select a Time:</label>
          <input type="time" id="time" value={selectedTime} onChange={handleTimeChange} className="mt-1 block w-full border-gray-300 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200" />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="button mt-4">Submit</button>
      </form>
    </div>
  );
};

export default BookingCollectionTime;
