import React, { useState } from 'react';
import { COMMODITY_CODES } from "../../../api/commodity-codes.model";
import Select from 'react-select';

const options = COMMODITY_CODES.map(item => ({
  value: item.CommodityCode,
  label: item.CommodityDescription
}));

function CommodityForm({ onAdd }) {

  const [commodity, setCommodity] = useState({
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
      CommodityCode: '',
      CommodityDescription: '',
       NumberOfUnits: '',
      UnitValue: '',
      UnitWeight: '', 
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
    <div className='flex flex-row'>
      <form onSubmit={handleSubmit}>
        <Select
          value={options.find(option => option.value === commodity.CommodityCode)}
          onChange={handleSelectChange}
          options={options}
          placeholder="Item Name"
          isSearchable
        />
        <p> {commodity.CommodityDescription}  </p> 

        <input name="NumberOfUnits" value={commodity.NumberOfUnits} onChange={handleChange} placeholder="Number of Units" />
        <input name="UnitValue" value={commodity.UnitValue} onChange={handleChange} placeholder="Unit Value" />
        <input name="UnitWeight" value={commodity.UnitWeight} onChange={handleChange} placeholder="Unit Weight" />
        {/* <input name="CountryOfOrigin.CountryCode" value={commodity.CountryOfOrigin.CountryCode} onChange={handleChange} placeholder="Country of Origin" />
        <input name="ProductCode" value={commodity.ProductCode} onChange={handleChange} placeholder="Product Code" />
        <input name="ManufacturerAddress.CompanyName" value={commodity.ManufacturerAddress.CompanyName} onChange={handleChange} placeholder="Company Name" />
        <input name="ManufacturerAddress.AddressLineOne" value={commodity.ManufacturerAddress.AddressLineOne} onChange={handleChange} placeholder="Address Line One" />
        <input name="ManufacturerAddress.AddressLineTwo" value={commodity.ManufacturerAddress.AddressLineTwo} onChange={handleChange} placeholder="Address Line Two" />
        <input name="ManufacturerAddress.City" value={commodity.ManufacturerAddress.City} onChange={handleChange} placeholder="City" />
        <input name="ManufacturerAddress.County" value={commodity.ManufacturerAddress.County} onChange={handleChange} placeholder="County" />
        <input name="ManufacturerAddress.Postcode" value={commodity.ManufacturerAddress.Postcode} onChange={handleChange} placeholder="Postcode" />
        <input name="ManufacturerAddress.Country.CountryCode" value={commodity.ManufacturerAddress.Country.CountryCode} onChange={handleChange} placeholder="Country" /> */}
        <button type="submit">Add New Item</button>
      </form>
    </div>
  );
}

export default CommodityForm;
