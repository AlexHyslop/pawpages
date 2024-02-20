import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import quoteAction from "../store/actions/quote.action";
import HeroImg from '../assets/images/home-hero-image.jpeg';
import QuotePackageSelector from "./quotes/quote-package-selector.component";
import { TGE_ENDPOINTS } from "../api/transglobal.service";
import { EXPORT_COUNTRIES } from "../api/tge-countries.model";
import { COLLECTION_COUNTRIES } from "../api/tge-countries.model";
export default function LandingPage(props) {
  const userDoc = useSelector((state) => state.user.doc);
  const redirect = useSelector((state) => state.routeFromLogin);
  const currentQuote = useSelector((state) => state?.quote?.currentQuote); 

  const [collectionCountry, setCollectionCountry] = React.useState(EXPORT_COUNTRIES[0]);
  const [destinationCountry, setDestinationCountry] = React.useState(COLLECTION_COUNTRIES[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  useEffect(() => {  
    var createQuote = false; 
    if(!currentQuote){
      createQuote = true; 
    }else {
      if(currentQuote.totalBoxes == 0){
        createQuote = true; 
      } 
    }

    if(createQuote){
      dispatch(quoteAction.updateCurrentQuote( {
        collectionCountry : collectionCountry,
        destinationCountry : destinationCountry,
        totalBoxes : 0,
        smallBoxes : 0,
        largeBoxes : 0
     }));   
    }
    if (redirect) navigate(redirect);
    
  //  console.log("Calling getCountries")
  //   TGE_ENDPOINTS.getCountries({
  //     Credentials:{ APIKey: 'Ry2oBZo6e7', Password: '8sbNkYi9&A'}
  // }, onGetCountries);

  }, []); 
  
  const onGetCountries = (response) => {
    console.log("onGetCountriesResp", response)
  }

  const handleGetQuotes = () => {

    //call tge minimal quote
     //  console.log("Calling getCountries")
    var packages = [];
    if(currentQuote.smallBoxes){
      for(var i=0; i < currentQuote.smallBoxes.Length-1; i++){ 
        packages.push({
            "Weight": 20.0,
            "Length": 46.0,
            "Width": 46.0,
            "Height": 46.0
          }
        );
      }
    }

    if(currentQuote.largeBoxes){
      for(var i=0; i < currentQuote.largeBoxes.Length-1; i++){
        packages.push({
          "Weight": 30.0,
          "Length": 50.0,
          "Width": 50.0,
          "Height": 60.0
          }
        );
      }
    }
    
    TGE_ENDPOINTS.getCountries({
      Credentials:{ APIKey: 'Ry2oBZo6e7', Password: '8sbNkYi9&A'},
      "Shipment": {
        "Consignment": {
          "ItemType": null,
          "Packages": packages
        },
        "CollectionAddress": {
          "City": null,
          "Postcode": null,
          "Country": {
            "CountryID": collectionCountry.CountryId,
            "CountryCode": collectionCountry.CountryCode
          }
        },
        "DeliveryAddress": {
          "City": null,
          "Postcode": null,
          "Country": {
            "CountryID": destinationCountry.CountryId,
            "CountryCode": destinationCountry.CountryCode
          }
        }
      } 

    }, onGetCountries);

    navigate("/booking")
    console.log(`Collection Country: ${collectionCountry.Title}, Destination Country: ${destinationCountry.Title}`);
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
            {COLLECTION_COUNTRIES.map((country, index) => <option key={index} value={country.Title}>{country.Title}</option>)}
          </select>
       
      </div>
      <div className="quote-col">
        <label>
          <h2>Destination Country:</h2> 
          </label>
          <select value={destinationCountry} onChange={e => setDestinationCountry(e.target.value)}>
            {EXPORT_COUNTRIES.map((country, index) => <option key={index} value={country.Title}>{country.Title}</option>)}
          </select> 
      </div>

      <QuotePackageSelector /> 


      <div className="quote-col-end">
        <button disabled={!currentQuote ||  currentQuote?.totalBoxes == 0} className="button" onClick={handleGetQuotes}>Get Quotes</button>
      </div>
     </div>
    

      </div>
      
    </div>
  );
}  
  