import { API_SERVICE } from "./axios.client";

export const TGE_ENDPOINTS = {
    getCountries: function getCountries(input, callback){   
        API_SERVICE.post('/country/v2/getCountries', input)
        .then(callback)
        .catch(error => error);
    },
    getMinimalQuote: function getMinimalQuote(input, callback){   
        API_SERVICE.post('/quote/v2/getQuoteMinimal', input)
        .then(callback)
        .catch(error => error);
    },
    getCommodity: function getCommodity(input, currentCommodity, callback){   
        API_SERVICE.post('/commodity/v2/getCommodity', input)
        .then((response) => callback(response, currentCommodity)) 
        .catch(error => error);
    },
    bookShipment: function bookShipment(input, currentCommodity, callback){   
        API_SERVICE.post('/book/v2/bookShipment', input)
        .then((response) => callback(response, currentCommodity)) 
        .catch(error => error);
    },
    
} 


