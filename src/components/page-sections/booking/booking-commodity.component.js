import React, { useState } from 'react';
import { COMMODITY_CODES } from "../../../api/commodity-codes.model"; 

const options = COMMODITY_CODES.map(item => ({
  value: item.CommodityCode,
  label: item.CommodityDescription
}));

function CommodityForm({ onAdd }) {

  const [commodity, setCommodity] = useState({
    Name: '',
    CommodityCode: '',
    CommodityDescription: '',
    NumberOfUnits: '',
    UnitValue: '',
    UnitWeight: ''
  });

  const handleChange = (e) => {
    setCommodity({
      ...commodity,
      [e.target.name]: e.target.value
    });
  };

  const handleInputChange = (e) => {
    setCommodity({
      ...commodity,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(commodity);
    setCommodity({
      Name: '',
      CommodityCode: '',
      CommodityDescription: '',
      NumberOfUnits: '',
      UnitValue: '',
      UnitWeight: ''
    });
  };

  const handleSelectChange = (selectedOption) => {
    console.log("selectedOption in item declare", selectedOption); 
    setCommodity({
      ...commodity,
      CommodityDescription: selectedOption.label,
      CommodityCode: selectedOption.value
    });
  };

  return (
    <div className=''>
      <form onSubmit={handleSubmit} > 
        <div className="grid grid-cols-1 gap-4 pt-4">
        <input className='border-secondary border-2 py-2 px-4 rounded-3xl' name="Name" value={commodity.Name} onChange={handleChange} placeholder="Item Name" required />
          <input className='border-secondary border-2 py-2 px-4 rounded-3xl' name="NumberOfUnits" value={commodity.NumberOfUnits} onChange={handleChange} placeholder="Number of Units" required />
          <input className='border-sec  ondary border-2 py-2 px-4 rounded-3xl' name="UnitValue" value={commodity.UnitValue} onChange={handleChange} placeholder="Unit Value" required />
          <input className='border-secondary border-2 py-2 px-4 rounded-3xl' name="UnitWeight" value={commodity.UnitWeight} onChange={handleChange} placeholder="Unit Weight" required />
        </div> 
        <button className='button mt-6 mx-auto' type="submit">Add New Item</button>
      </form>
    </div>
  );
}

export default CommodityForm;
