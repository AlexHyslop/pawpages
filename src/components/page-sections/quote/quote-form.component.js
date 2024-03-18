import CollectionCountries from './quote-collection-country.component';
import DestionationCountries from './quote-destination-country.component';
import CollectionPostCode from './quote-collection-postcode';
import DestinationPostCode from './quote-destination-postcode';

export default function QuoteForm() {
    return(
        <form>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8'>
                <CollectionCountries />
                <CollectionPostCode />
                <DestionationCountries />
                <DestinationPostCode />
            </div>
            <button className='button mt-8'>Submit</button>
        </form>
    )
}