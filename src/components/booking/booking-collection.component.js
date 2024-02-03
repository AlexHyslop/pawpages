import React, { useState } from 'react';

export default function Collection(props) {
    const [formState, setFormState] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
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
    console.log(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        Postal Code:
        <input type="text" name="postalCode" onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

