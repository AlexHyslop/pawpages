import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import quoteAction from '../../store/actions/quote.action';

export default function BookingAddress(props) {
  const dispatch = useDispatch(); 
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);

  const [formState, setFormState] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var quote = JSON.parse(JSON.stringify(currentQuote));
    if(props.type == "collection"){
      quote.collectionAddress = formState; 
    }
    if(props.type == "delivery"){
      quote.deliveryAddress = formState; 
    }
    dispatch(quoteAction.updateCurrentQuote( quote ));   
    props.incrementStage();  
  };

  return (
    <div> 
      <h5> {props.type == "collection" ? "Collection Address" : "Delivery Address" }</h5>
    <form style={{display: 'flex', flexDirection:'column'}} onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" onChange={handleChange} />
      </label>
      <label>
        Street:
        <input type="text" name="street" onChange={handleChange} />
      </label>
      <label>
        City:
        <input type="text" name="city" onChange={handleChange} />
      </label>
      <label>
        State:
        <input type="text" name="state" onChange={handleChange} />
      </label>
      <label>
        Country:
        <input type="text" name="country" onChange={handleChange} />
      </label>
      <label>
        Postal Code:
        <input type="text" name="postalCode" onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
    </div>
  );
}

