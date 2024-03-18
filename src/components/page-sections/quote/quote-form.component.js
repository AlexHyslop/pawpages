import CollectionCountries from './quote-collection-country.component';
import DestinationCountries from './quote-destination-country.component';
import CollectionPostCode from './quote-collection-postcode';
import DestinationPostCode from './quote-destination-postcode';
import { EXPORT_COUNTRIES } from '../../../api/tge-countries.model';
import { COLLECTION_COUNTRIES } from '../../../api/tge-countries.model';


export default function QuoteForm() {
    return(
        <form>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8'>
                <CollectionCountries countries={EXPORT_COUNTRIES} />
                <CollectionPostCode />
                <DestinationCountries countries={COLLECTION_COUNTRIES}/>
                <DestinationPostCode />
            </div>
            <button className='button mt-8'>Submit</button>
        </form>
    )
}