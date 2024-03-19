export default function CollectionPostCode({ collectionPostcode, onChange }) {
    return (
        <div>
          <label htmlFor="postcode" className="block text-sm font-extrabold leading-6 text-primary text-left">
            Collection Post Code
          </label>
          <div className="relative mt-2">
            <input
              id="postcode"
              type="text"
              className="appearance-none block pl-3 min-h-10 py-1.5 pr-10 w-full border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your postcode"
              value={collectionPostcode}
              onChange={(e) => onChange(e.target.value)}
            />
    
          </div>
        </div>
      );
}