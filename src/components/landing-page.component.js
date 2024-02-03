import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import quoteAction from "../store/actions/quote.action";
 
export default function LandingPage(props) {
  const userDoc = useSelector((state) => state.user.doc);
  const redirect = useSelector((state) => state.routeFromLogin);
  const countries = ["United Kingdom", "Ireland", "Australia", "New Zealand", "USA", "Canada", "France", "Germany", "Spain", "Belgium"]; 
  const [collectionCountry, setCollectionCountry] = React.useState(countries[0]);
  const [destinationCountry, setDestinationCountry] = React.useState(countries[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  useEffect(() => {  
    if (redirect) navigate(redirect);
  }, []);

  const handleGetQuotes = () => {
    dispatch(quoteAction.updateQuote( {
        collectionCountry : collectionCountry,
        destinationCountry : destinationCountry,
        totalBoxes : 0,
        smallBoxes : 0,
        largeBoxes : 0
     }));   

     navigate("/quote")
    console.log(`Collection Country: ${collectionCountry}, Destination Country: ${destinationCountry}`);
  }; 

  return (
    <div>
      <label>
        Collection Country:
        <select value={collectionCountry} onChange={e => setCollectionCountry(e.target.value)}>
          {countries.map((country, index) => <option key={index} value={country}>{country}</option>)}
        </select>
      </label>
      <label>
        Destination Country:
        <select value={destinationCountry} onChange={e => setDestinationCountry(e.target.value)}>
          {countries.map((country, index) => <option key={index} value={country}>{country}</option>)}
        </select>
      </label>
      <button onClick={handleGetQuotes}>Get Quotes</button>
    </div>
  );
}  
  