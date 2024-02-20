import { API_SERVICE } from "./axios.client";

export const TGE_ENDPOINTS = {
    getCountries: function getCountries(input, callback){   
        API_SERVICE.post('/country/v2/getCountries', input)
        .then(callback)
        .catch(error => error);
    },
    getMinimalQuote: function getMinimalQuote(input, callback){   
        API_SERVICE.post('/quote/v2/GenerateGetQuoteMinimal', input)
        .then(callback)
        .catch(error => error);
    }
} 


