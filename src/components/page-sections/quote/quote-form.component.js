import React from "react";
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
import { useNavigate } from "react-router-dom";

export default function QuoteForm() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const currentQuote = useSelector((state) => state?.quote?.currentQuote);  
    const [collectionCountry, setCollectionCountry] = React.useState(COLLECTION_COUNTRIES[0]);
    const [destinationCountry, setDestinationCountry] = React.useState(EXPORT_COUNTRIES[0]);  
    const [collectionPostcode, setCollectionPostcode] = React.useState('');
    const [destinationPostcode, setDestinationPostcode] = React.useState(''); 
    const [errorMessage, setErrorMessage] = React.useState(""); 
    const [loading, setLoading] = React.useState(false);

    const handleDestinationCountry = (event) => {
        console.log(event)
        setDestinationCountry(event.target.value);
    };

    const handleCollectionCountry = (event) => {
      setCollectionCountry(event.target.value);
    };


    const handleGetQuotes = () => {
        setErrorMessage('');
        if(!collectionPostcode){
            setErrorMessage("Please enter collection post code");
            return; 
        }

        if(!destinationPostcode){
            setErrorMessage("Please enter destination post code");
            return;
        }

        if(currentQuote && currentQuote.totalBoxes == 0){
            setErrorMessage("Please select amount of boxes");
            return;
        }

        setLoading(true);  
        var packages = [];
        if(currentQuote.smallBoxes){
          for(var i=0; i < currentQuote.smallBoxes; i++){ 
            packages.push({ "Weight": 20.0, "Length": 46.0,  "Width": 46.0,  "Height": 46.0 });
          }
        }
    
        if(currentQuote.largeBoxes){
          for(var i=0; i < currentQuote.largeBoxes; i++){
            packages.push({ "Weight": 30.0, "Length": 50.0, "Width": 50.0, "Height": 60.0 });
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
        TGE_ENDPOINTS.getMinimalQuote(getMinimalQuote, onGetMinimalQuote); 

        navigate("/quote")
    }; 

    const onGetMinimalQuote = (response) => {
        setLoading(false);
        if(response.status == 200){
          if(response.data.Status == 'SUCCESS'){
            console.log("onGetMinimalQuote full data", response.data) 
            console.log("onGetMinimalQuote serviceResults", response.data.ServiceResults) 
            console.log("onGetMinimalQuote quoteId ", response.data.QuoteID) 

            var quoteId = response.data.QuoteID; 
            console.log("pre filtered"); 

            var filteredServiceResults = response.data.ServiceResults.filter(res =>               
              res.ServiceName === 'TG Express Worldwide' ||
              res.ServiceName === 'TG Express Worldwide Light (DHL)' ||
              res.ServiceName === 'DHL Express Worldwide' ||
              res.ServiceName === 'TG International Economy' ||
              res.ServiceName === 'TG International Express'
          );
            console.log("filteredResults", filteredServiceResults); 


            filteredServiceResults.forEach(res => res.QuoteId = quoteId); 

            console.log("filteredResults", filteredServiceResults); 
            dispatch(quoteAction.updateServiceResults(  filteredServiceResults ));    
          } 
        }
      }

      
    return(
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8'>
                <CollectionCountries setCountry={setCollectionCountry} countries={COLLECTION_COUNTRIES} />
                <CollectionPostCode collectionPostcode={collectionPostcode} onChange={setCollectionPostcode} />

                <DestinationCountries setCountry={setDestinationCountry}  countries={EXPORT_COUNTRIES}/>
                <DestinationPostCode destinationPostcode={destinationPostcode} onChange={setDestinationPostcode} />

                <QuotePackageSelector />
            </div>

            <p className="text-red-400"> {errorMessage} </p>

            {loading ? (
                <i class="fa-solid fa-spinner fa-spin text-lg"></i>  
            ) : (
                <button className='button mt-8 float-right'  onClick={handleGetQuotes}>Get Quotes</button>
            )}  
          
        </>
    )
}
 

    //transglobal actual service but selling at as DHL 