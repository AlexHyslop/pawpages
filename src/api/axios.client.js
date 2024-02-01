import axios from 'axios';

 
const baseURL = 'https://api.twilio.com/2010-04-01/Accounts/AC8efce7063172f70780ac030a732a5bb5';
            
export const API_SERVICE = axios.create({
  baseURL
}); 

API_SERVICE.interceptors.request.use(function (config) { 
        config.headers['Content-Type'] =  'application/x-www-form-urlencoded';
        // config.headers.Authorization =  'Basic ' + btoa('AC8efce7063172f70780ac030a732a5bb5:e67e40f0073bcb0b279368c48a0024d5'); 
        config.headers.Authorization = 'Basic ' + btoa('AC8efce7063172f70780ac030a732a5bb5:e67e40f0073bcb0b279368c48a0024d5'); 
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