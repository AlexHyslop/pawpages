import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'; 
import quoteAction from "../store/actions/quote.action";
import HeroImg from '../assets/images/home-hero-image.jpeg'; 
import { EXPORT_COUNTRIES } from "../api/tge-countries.model";
import { COLLECTION_COUNTRIES } from "../api/tge-countries.model";
import HomeHero from "./page-sections/home/home-hero";
import Howitworks from "./page-sections/home/home-how-it-works";
import WhatWeDeliver from "./page-sections/home/home-what-we-deliver";
import Sustainability from "./page-sections/home/home-sustainability";
import Reviews from "./page-sections/home/home-reviews"; 
import { RATES_SERVICE } from "../services/rates.service";
import ratesAction from "../store/actions/rates.action";

export default function LandingPage(props) {
  const userDoc = useSelector((state) => state.user.doc);
  const redirect = useSelector((state) => state.routeFromLogin);
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);  
  const [collectionCountry, setCollectionCountry] = React.useState(COLLECTION_COUNTRIES[0]);
  const [destinationCountry, setDestinationCountry] = React.useState(EXPORT_COUNTRIES[0]);
 
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  useEffect(() => {  
    RATES_SERVICE.getEconomyRates(onGetEconomyRates);
    RATES_SERVICE.getExpressRates(onGetExpressRates);  
     
    dispatch(quoteAction.updateCurrentQuote( {
      collectionCountry : collectionCountry,
      destinationCountry : destinationCountry,
      totalBoxes : 0,
      smallBoxes : 0,
      largeBoxes : 0
    }));    
    
    if (redirect) navigate(redirect); 
    
  }, []); 
  
  const onGetEconomyRates = (response) => {
      console.log('onGetEconomyRates', response)
      dispatch( ratesAction.updateEconomyRates( response ));  
  }

  const onGetExpressRates = (response) => {
    console.log('expressRatesResponse', response)
    dispatch( ratesAction.updateExpressRates( response ));  
  }
 
  
  const heroStyle = {
    backgroundImage: `url(${HeroImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return ( 
    <>
      <HomeHero />
      <Howitworks />
      <WhatWeDeliver />
      <Sustainability />
      <Reviews />
    </>
  );
}  
  