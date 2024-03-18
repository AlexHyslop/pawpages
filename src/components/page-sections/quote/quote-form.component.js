import React, { useEffect } from "react";
import CollectionCountries from './quote-collection-country.component';
import DestinationCountries from './quote-destination-country.component';
import CollectionPostCode from './quote-collection-postcode';
import DestinationPostCode from './quote-destination-postcode';
import { EXPORT_COUNTRIES } from '../../../api/tge-countries.model';
import { COLLECTION_COUNTRIES } from '../../../api/tge-countries.model';
import QuotePackageSelector from './quote-package-selector.component';
import { useDispatch, useSelector } from "react-redux";
import quoteAction from "../../../store/actions/quote.action";
import { TGE_ENDPOINTS } from "../../../api/transglobal.service";

export default function QuoteForm() {
    const dispatch = useDispatch(); 
    const [collectionCountry, setCollectionCountry] = React.useState(COLLECTION_COUNTRIES[0]);
    const [destinationCountry, setDestinationCountry] = React.useState(EXPORT_COUNTRIES[0]);  
    const [collectionPostcode, setCollectionPostcode] = React.useState('');
    const [destinationPostcode, setDestinationPostcode] = React.useState('');

    const currentQuote = useSelector((state) => state?.quote?.currentQuote); 

    const [errorMessage, setErrorMessage] = React.useState(""); 
    const [loading, setLoading] = React.useState(false);

    const handleDestinationPostcode = (event) => {
        console.log(event)
        setDestinationPostcode(event.target.value);
    };
    

    const handleCollectionPostcode = (event) => {
        setCollectionPostcode(event.target.value);
    };


    const handleGetQuotes = () => {
        setLoading(true);
        
        console.log(" collection country ", collectionCountry)
        console.log(" destinationCountry  ", destinationCountry)

        console.log("currentQuote handleGetQuoate", currentQuote)
        var packages = [];
        if(currentQuote.smallBoxes){
          for(var i=0; i < currentQuote.smallBoxes; i++){ 
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
          for(var i=0; i < currentQuote.largeBoxes; i++){
            packages.push({
              "Weight": 30.0,
              "Length": 50.0,
              "Width": 50.0,
              "Height": 60.0
              }
            );
          }
        } 
     
        var getMinimalQuote = {
          //     Credentials:{ APIKey: 'Ry2oBZo6e7', Password: '8sbNkYi9&A'}
          Credentials:{ APIKey: '9rkYJ0Qq6s', Password: 'Z6jxC&dyV2'},
          "Shipment": {
            "Consignment": {
              "ItemType": "Parcel",
              "Packages": packages
            },
            "CollectionAddress": {
              // "City": currentQuote?.collectionAddress?.city,
              "Postcode": collectionPostcode,
              "Country": {
                "CountryID": collectionCountry.CountryID,
                "CountryCode": collectionCountry.CountryCode
              }
            },
            "DeliveryAddress": {
              // "City": currentQuote?.deliveryAddress?.city,
              "Postcode": destinationPostcode,
              "Country": {
                "CountryID": destinationCountry.CountryID,
                "CountryCode": destinationCountry.CountryCode
              }
            }
          }  
        };
    
         dispatch(quoteAction.updateMinimalQuote( getMinimalQuote ));
    
        // TGE_ENDPOINTS.getMinimalQuote(getMinimalQuote, onGetMinimalQuote);
    
        // console.log(`Collection Country: ${collectionCountry.Title}, Destination Country: ${destinationCountry.Title}`);
      }; 

      
    return(
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8'>
                <CollectionCountries setCountry={handleCollectionPostcode} countries={COLLECTION_COUNTRIES} />
                <CollectionPostCode collectionPostcode={collectionPostcode} onChange={setCollectionPostcode} />

                <DestinationCountries setCountry={handleDestinationPostcode}  countries={EXPORT_COUNTRIES}/>
                <DestinationPostCode destinationPostcode={destinationPostcode} onChange={setDestinationPostcode} />

                <QuotePackageSelector />
            </div>
            <button className='button mt-8' onClick={handleGetQuotes}>Submit</button>
        </>
    )
}