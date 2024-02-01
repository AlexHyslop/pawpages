import { API_SERVICE } from "./axios.client";
import querystring from 'querystring';

export const SMS_ENDPOINTS = {
    sendSMS: function sendSMS(input, callback){   
        const postData = querystring.stringify(input);
 
        API_SERVICE.post('/Messages.json', postData)
        .then(callback)
        .catch(error => error);
    }
}






