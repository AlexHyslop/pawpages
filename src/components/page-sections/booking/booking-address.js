import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import quoteAction from '../../../store/actions/quote.action';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default function BookingAddress(props) {
  const dispatch = useDispatch(); 
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);
  const [errorMessage, setErrorMessage] = useState(false);
  const [manualInput, setManualInput] = useState(false);
  const requiredFields = [
    "firstName",
    "lastName",
    "street",
    "city",
    "state",
    "phoneNumber",
    "email"
  ];

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '', 
    phoneNumber: '',
    instructions: ''
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };  
  
  function formIsValid(){
    for (const field of requiredFields) {
      console.log("checking field "+field)
        if (!formState[field]) {
          setErrorMessage("Required field is missing.")
          return false;
        }
    } 
    return true;
  }
  const autoSubmit = () => { 
      console.log("auto submit redux addresses", formState);
      var quote = JSON.parse(JSON.stringify(currentQuote));
      if(props.type === "collection"){
        quote.collectionAddress = {};
        quote.collectionAddress.Forename = formState.firstName;
        quote.collectionAddress.Surname = formState.lastName;
        quote.collectionAddress.AddressLineOne = formState.street;
        quote.collectionAddress.City = formState.city;
        quote.collectionAddress.County = formState.state;
        quote.collectionAddress.TelephoneNumber = formState.phoneNumber;
        quote.collectionAddress.instructions = formState.instructions;
        quote.collectionAddress.EmailAddress = formState.email;
        quote.collectionAddress.Postcode = currentQuote?.collectionCountry?.postalCode; 
        quote.collectionAddress.Country = {};
        quote.collectionAddress.Country.CountryCode = currentQuote?.collectionCountry.CountryCode;  
      }
      if(props.type === "delivery"){
        quote.destinationAddress = {};
        quote.destinationAddress.Forename = formState.firstName;
        quote.destinationAddress.Surname = formState.lastName;
        quote.destinationAddress.AddressLineOne = formState.street;
        quote.destinationAddress.City = formState.city;
        quote.destinationAddress.County = formState.state;
        quote.destinationAddress.TelephoneNumber = formState.phoneNumber;
        quote.destinationAddress.instructions = formState.instructions;
        quote.destinationAddress.EmailAddress = formState.email;
        quote.destinationAddress.Postcode = currentQuote?.destinationCountry?.postalCode; 
        quote.destinationAddress.Country = {};
        quote.destinationAddress.Country.CountryCode = currentQuote?.destinationCountry.CountryCode;  
      }

      console.log("dispatch", formIsValid()); 
      dispatch(quoteAction.updateCurrentQuote(quote));    
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("form is valid", formIsValid()); 
    if(formIsValid()){
      autoSubmit();
      props.incrementStage();  
    }
  };

   return (
     <div className="p-4 col-span-1 md:col-span-3"> 
      <h1 className='text-xl mb-4'> {props.type === "collection" ? "Collection Address" : "Delivery Address" }</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}> 
      <div className='col-span-2 md:col-span-1'>
        <label className="block mb-2 text-primary text-sm">Street: </label>
        <input className="border text-primary border-gray-300 rounded p-1 w-full" type="text" name="street" onChange={handleChange} value={formState.street} required/>
      </div>
      
      <div className='col-span-2 md:col-span-1'>
        <label className="block mb-2 text-primary text-sm">City:</label>
        <input className="border text-primary border-gray-300 rounded p-1 w-full" type="text" name="city" onChange={handleChange} value={formState.city} required/>
      </div>

      <div className='col-span-2 md:col-span-1'>
        <label className="block mb-1 text-primary text-sm">State:</label>
        <input className="border text-primary border-gray-300 rounded p-1 w-full" type="text" name="state" onChange={handleChange} value={formState.state} required/>
      </div>
      
      <div className='col-span-2 md:col-span-1'>
        <label className="block mb-1 text-primary text-sm">Country:</label>
        <input className="border text-primary border-gray-300 rounded p-1 w-full" type="text" name="country"  disabled={true}
         value={props.type === "collection" ? currentQuote?.collectionCountry?.Title : currentQuote.destinationCountry.Title} />
      </div>
      
      <div className='col-span-2 md:col-span-1'>
        <label className="block mb-1 text-primary text-sm">Postal Code:</label>
        <input className="border text-primary border-gray-300 rounded p-1 w-full" type="text" name="postalCode" disabled={true}
        value={props.type === "collection" ? currentQuote?.collectionCountry?.postalCode : currentQuote.destinationCountry.postalCode} />
      </div> 
       
      <div className='col-span-2 md:col-span-1'>
      <label className="block mb-1 text-primary text-sm">Phone Number:</label>
        <div className="flex">
          <select className="border text-sm text-primary col-span-1 border-gray-300 rounded p-1 mr-1" name="countryCode" onChange={handleChange} value={formState.countryCode}>
            <option value="+44">+44</option> 
          </select>
          <input className="border self-stretch w-full border-gray-300 rounded p-1 justify-self-stretch text-sm text-primary" type="text" name="phoneNumber" onChange={handleChange} value={formState.phoneNumber} required/>
        </div> 
      </div>

      <div className='col-span-2 md:col-span-1'>
        <label className="block mb-2 text-primary text-sm">Contact First Name:</label>
        <input className="border border-gray-300 rounded p-1 w-full text-primary" type="text" name="firstName" onChange={handleChange} value={formState.firstName} required/>
      </div>

      <div className='col-span-2 md:col-span-1'>
        <label className="block mb-2 text-primary text-sm">Contact Last Name:</label>
        <input className="border border-gray-300 rounded p-1 w-full text-primary" type="text" name="lastName" onChange={handleChange} value={formState.lastName} required/>
      </div>

      <div className='col-span-2'>
        <label className="block mb-2 text-primary text-sm">Email:</label>
        <input className="border text-primary w-full border-gray-300 rounded p-1" type="email" name="email" onChange={handleChange} value={formState.email} required />
      </div>
      
      <div className='col-span-2'>
        <label className="block mb-2 text-primary text-sm">Instructions:</label>
        <input className="border text-primary w-full border-gray-300 rounded p-1" type="text" name="instructions" onChange={handleChange} value={formState.instructions} />
      </div>
        
      <div className='col-span-2 text-right'>
        <input className="button col-span-2 mt-4 w-full mx-auto block" type="submit" value="Continue" />
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );

  // const countryRestrictionOptions = {
  //   types: ['address'],
  //   componentRestrictions: { country: props.limitedCountries } 
  // };

  // const handleAddressChange = (address) => {
  //   setFormState({
  //     ...formState,
  //     street: address
  //   });
  // };

  // const handleAddressSelect = async (address) => {
  //   const results = await geocodeByAddress(address);
  //   const latLng = await getLatLng(results[0]);
  
  //   const addressComponents = results[0].address_components;
  //   const streetNumberComponent = addressComponents.find(component => component.types.includes('street_number'));
  //   const streetNameComponent = addressComponents.find(component => component.types.includes('route'));
  //   const cityComponent = addressComponents.find(component => component.types.includes('locality') || component.types.includes('postal_town'));    const stateComponent = addressComponents.find(component => component.types.includes('administrative_area_level_1'));
  //   const countryComponent = addressComponents.find(component => component.types.includes('country'));
  //   const postalCodeComponent = addressComponents.find(component => component.types.includes('postal_code'));
  
  //   const streetNumber = streetNumberComponent ? streetNumberComponent.long_name : '';
  //   const streetName = streetNameComponent ? streetNameComponent.long_name : '';
  //   const city = cityComponent ? cityComponent.long_name : '';
  //   const state = stateComponent ? stateComponent.short_name : '';
  //   const country = countryComponent ? countryComponent.long_name : '';
  //   const postalCode = postalCodeComponent ? postalCodeComponent.long_name : '';
  
  //   setFormState({
  //     ...formState,
  //     street: `${streetNumber} ${streetName}`,
  //     city,
  //     state,
  //     country,
  //     postalCode
  //   });

  //   var currAddr = {
  //   street: `${streetNumber} ${streetName}`,
  //   city,
  //   state,
  //   country,
  //   postalCode
  // }

  //   autoSubmit(currAddr);
  // };
}