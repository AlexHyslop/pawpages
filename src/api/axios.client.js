import axios from 'axios';

//twilio sms urlhttps://api.twilio.com/2010-04-01/Accounts/AC8efce7063172f70780ac030a732a5bb5
// 
//live https://services3.transglobalexpress.co.uk/Country/V2/GetCountries
const baseURL = 'https://staging2.services3.transglobalexpress.co.uk';
//const baseURL = 'https://services3.transglobalexpress.co.uk';

export const API_SERVICE = axios.create({
  baseURL
}); 

//prod cred
// const credentials = {
//     APIKey: 'Ry2oBZo6e7',
//     Password: '8sbNkYi9&A'
// };

const credentials = {
    APIKey: '9rkYJ0Qq6s',
    Password: 'Z6jxC&A'
}; 


API_SERVICE.interceptors.request.use(function (config) { 
        config.headers['Content-Type'] =  'application/json';
        
        // config.headers.Authorization = 'Basic ' + btoa('AC8efce7063172f70780ac030a732a5bb5:e67e40f0073bcb0b279368c48a0024d5'); 

        //  if (config.data) {
        //      config.data = {
        //     ...config.data,
        //     Credentials: credentials
        //     };
        // } else { 
        //     config.data = {
        //     Credentials: credentials
        //     };
        // }
        
        return config; 
    }
)

axios.interceptors.response.use(response => {
    return response; 
}, error => {
    if(error.response.status === 401){
        console.log("http error logged in axios")
    }
    return error; 
})