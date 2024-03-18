import CollectionCountries from './quote-collection-country.component';
import DestinationCountries from './quote-destination-country.component';
import CollectionPostCode from './quote-collection-postcode';
import DestinationPostCode from './quote-destination-postcode';
import { EXPORT_COUNTRIES } from '../../../api/tge-countries.model';
import { COLLECTION_COUNTRIES } from '../../../api/tge-countries.model';
import QuotePackageSelector from './quote-package-selector.component';


export default function QuoteForm() {

    // const handleGetQuotes = () => {
    //     setLoading(true);
       
    //     console.log("currentQuote handleGetQuoate", currentQuote)
    //     var packages = [];
    //     if(currentQuote.smallBoxes){
    //       for(var i=0; i < currentQuote.smallBoxes; i++){ 
    //         packages.push({
    //             "Weight": 20.0,
    //             "Length": 46.0,
    //             "Width": 46.0,
    //             "Height": 46.0
    //           }
    //         );
    //       }
    //     }
    
    //     if(currentQuote.largeBoxes){
    //       for(var i=0; i < currentQuote.largeBoxes; i++){
    //         packages.push({
    //           "Weight": 30.0,
    //           "Length": 50.0,
    //           "Width": 50.0,
    //           "Height": 60.0
    //           }
    //         );
    //       }
    //     } 
    
    //     console.log("Collection country", collectionCountry);
    //     console.log("Destination country", destinationCountry);
    //     var getMinimalQuote = {
    //       //     Credentials:{ APIKey: 'Ry2oBZo6e7', Password: '8sbNkYi9&A'}
    //       Credentials:{ APIKey: '9rkYJ0Qq6s', Password: 'Z6jxC&dyV2'},
    //       "Shipment": {
    //         "Consignment": {
    //           "ItemType": "Parcel",
    //           "Packages": packages
    //         },
    //         "CollectionAddress": {
    //           // "City": currentQuote?.collectionAddress?.city,
    //           "Postcode": collectionPostcode,
    //           "Country": {
    //             "CountryID": collectionCountry.CountryID,
    //             "CountryCode": collectionCountry.CountryCode
    //           }
    //         },
    //         "DeliveryAddress": {
    //           // "City": currentQuote?.deliveryAddress?.city,
    //           "Postcode": destinationPostcode,
    //           "Country": {
    //             "CountryID": destinationCountry.CountryID,
    //             "CountryCode": destinationCountry.CountryCode
    //           }
    //         }
    //       }  
    //     };
    
    //     dispatch(quoteAction.updateMinimalQuote( getMinimalQuote ));
    
    //     TGE_ENDPOINTS.getMinimalQuote(getMinimalQuote, onGetMinimalQuote);
    
    //     console.log(`Collection Country: ${collectionCountry.Title}, Destination Country: ${destinationCountry.Title}`);
    //   }; 

      
    return(
        <form>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8'>
                <CollectionCountries countries={EXPORT_COUNTRIES} />
                <CollectionPostCode />

                <DestinationCountries countries={COLLECTION_COUNTRIES}/>
                <DestinationPostCode />

                <QuotePackageSelector />
            </div>
            <button className='button mt-8'>Submit</button>
        </form>
    )
}