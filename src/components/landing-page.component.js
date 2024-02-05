import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import quoteAction from "../store/actions/quote.action";
import HeroImg from '../assets/images/home-hero-image.jpeg';
 
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

  const heroStyle = {
    backgroundImage: `url(${HeroImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="full-container hero" style={heroStyle}>
      <div className="hero-overlay"></div>
      <div className="container relative">
        <div className="hero-text">
        <h1>Your Luggage Delivery Service</h1>
        <p>RelexCo ship luggage and boxes to over 200 global destinations. Get an instant quote today.</p>
        </div>
     <div className="quotes-container">
      <div className="quote-col">
        <label>
          <h2>Collection Country:</h2>
          </label>
          <select value={collectionCountry} onChange={e => setCollectionCountry(e.target.value)}>
            {countries.map((country, index) => <option key={index} value={country}>{country}</option>)}
          </select>
       
      </div>
      <div className="quote-col">
        <label>
          <h2>Destination Country:</h2> 
          </label>
          <select value={destinationCountry} onChange={e => setDestinationCountry(e.target.value)}>
            {countries.map((country, index) => <option key={index} value={country}>{country}</option>)}
          </select>
        
      </div>
      <div className="quote-col-end">
        <button className="button" onClick={handleGetQuotes}>Get Quotes</button>
      </div>
     </div>
    
      </div>
      
    </div>
  );
}  
  