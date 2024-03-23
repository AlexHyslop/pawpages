import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import quoteAction from '../../../store/actions/quote.action';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default function BookingAddress(props) {
  const dispatch = useDispatch(); 
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);
  const [manualInput, setManualInput] = useState(false);

  const countryRestrictionOptions = {
    types: ['address'],
    componentRestrictions: { country: props.limitedCountries } 
  };
  
  const [formState, setFormState] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    phoneNumber: '',
    instructions: ''
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

  const handleAddressChange = (address) => {
    setFormState({
      ...formState,
      street: address
    });
  };

  const handleAddressSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
  
    const addressComponents = results[0].address_components;
    const streetNumberComponent = addressComponents.find(component => component.types.includes('street_number'));
    const streetNameComponent = addressComponents.find(component => component.types.includes('route'));
    const cityComponent = addressComponents.find(component => component.types.includes('locality') || component.types.includes('postal_town'));    const stateComponent = addressComponents.find(component => component.types.includes('administrative_area_level_1'));
    const countryComponent = addressComponents.find(component => component.types.includes('country'));
    const postalCodeComponent = addressComponents.find(component => component.types.includes('postal_code'));
  
    const streetNumber = streetNumberComponent ? streetNumberComponent.long_name : '';
    const streetName = streetNameComponent ? streetNameComponent.long_name : '';
    const city = cityComponent ? cityComponent.long_name : '';
    const state = stateComponent ? stateComponent.short_name : '';
    const country = countryComponent ? countryComponent.long_name : '';
    const postalCode = postalCodeComponent ? postalCodeComponent.long_name : '';
  
    setFormState({
      ...formState,
      street: `${streetNumber} ${streetName}`,
      city,
      state,
      country,
      postalCode
    });

    var currAddr = {
    street: `${streetNumber} ${streetName}`,
    city,
    state,
    country,
    postalCode
  }

    autoSubmit(currAddr);
  };
  
  const autoSubmit = (currAddr) => {
    if(currAddr){ 
      console.log("auto submit redux addresses", formState)
      var quote = JSON.parse(JSON.stringify(currentQuote));
      if(props.type === "collection"){
        quote.collectionAddress = currAddr; 
      }
      if(props.type === "delivery"){
        quote.deliveryAddress = currAddr; 
      }
      dispatch(quoteAction.updateCurrentQuote(quote));    
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    autoSubmit();
    // props.incrementStage();  
  };

   return (
     <div className="p-4"> 
      <h5> {props.type === "collection" ? "Collection Address" : "Delivery Address" }</h5>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="mt-2">Street: 
          {manualInput ? (
            <input type="text" name="street" onChange={handleChange} value={formState.street} />
          ) : (
            <PlacesAutocomplete value={formState.street} onChange={handleAddressChange} onSelect={handleAddressSelect}
            searchOptions={countryRestrictionOptions}>
              
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })} />
                <div className="autocomplete-dropdown-container">   
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                    };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          
          )}
        </label>
        <button type="button" onClick={() => setManualInput(!manualInput)}>Enter address manually?</button>
        {manualInput && (
          <>
          <label className="mt-2">City:</label>
          <input className="border border-gray-300 rounded p-1" type="text" name="city" onChange={handleChange} value={formState.city} />
          <label className="mt-2">State:</label>
          <input className="border border-gray-300 rounded p-1" type="text" name="state" onChange={handleChange} value={formState.state} />
          <label className="mt-2">Country:</label>
          <input className="border border-gray-300 rounded p-1" type="text" name="country" onChange={handleChange} value={formState.country} />
          <label className="mt-2">Postal Code:</label>
          <input className="border border-gray-300 rounded p-1" type="text" name="postalCode" onChange={handleChange} value={formState.postalCode} />
        </>
        )}
        <label className="mt-2">Phone Number:</label>
        <div className="flex">
          <select className="border border-gray-300 rounded p-1 mr-1" name="countryCode" onChange={handleChange} value={formState.countryCode}>
            <option value="+44">+44</option> 
          </select>
          <input className="border border-gray-300 rounded p-1" type="text" name="phoneNumber" onChange={handleChange} value={formState.phoneNumber} />
        </div>
        <label className="mt-2">Contact Name:</label>
        <input className="border border-gray-300 rounded p-1" type="text" name="name" onChange={handleChange} value={formState.name} />
        <label className="mt-2">Instructions:</label>
        <input className="border border-gray-300 rounded p-1" type="text" name="instructions" onChange={handleChange} value={formState.instructions} />
        <input className="mt-2 bg-blue-500 text-white px-2 py-1 rounded cursor-pointer" type="submit" value="Submit" />
      </form>
    </div>
  );
}