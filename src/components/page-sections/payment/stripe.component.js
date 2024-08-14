import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements } from "@stripe/react-stripe-js";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, AddressElement } from "@stripe/react-stripe-js";
import QuoteDisplay from "../../quotes/quote-display.component";
import { useSelector } from "react-redux";
import { TGE_ENDPOINTS } from "../../../api/transglobal.service";
import { QUOTE_SERVICE } from "../../../services/quote.service";
import { useDispatch } from "react-redux";
import bookingAction from "../../../store/actions/booking.action";
import { useNavigate } from "react-router-dom";
import { EMAIL_SERVICE } from "../../../services/email.service";
const stripePromise = loadStripe('pk_test_51P6COu02R2DxG1YvFLAxID2SLMnzzzKJTGK0WtfAPxX0E482MZhE3KNR2yH1rWx8FU6EKUpr46H72BfBdbfrOjzh00HzyNsmzP');
 
const cardElementOptions = {
  style: {
    base: {
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '18px',
    },
  },
}; 


export default function Stripe(props) { 
  
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm() {
  const currentQuote = useSelector((state) => state?.quote?.currentQuote);  
  const serviceResults = useSelector((state) => state?.quote?.serviceResults);  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [bookingSuccess, setBookingSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');


  const createPaymentIntent = async () => {
    if(currentQuote && currentQuote.actualPrice){
    console.log("in payment intent")
    try {
      const response = await fetch('https://us-central1-relexco-446af.cloudfunctions.net/createPaymentIntent', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            amount: currentQuote.actualPrice,
            currency: 'gbp' 
          }
          ),  
      });
  
        const { clientSecret } = await response.json();
        console.log("got response ", clientSecret)
    
        return clientSecret;
      } catch (error) {
        console.error('Error creating payment intent:', error); 
      }
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    
      const clientSecret = await createPaymentIntent();
      console.log("got client secret", clientSecret); 

      const cardNumberElement = elements.getElement(CardNumberElement);
      const addressElement = elements.getElement(AddressElement);

      // Optional: Logging card elements (for debugging purposes only, should not be done in production)
      console.log("CardNumberElement: ", cardNumberElement);

      // We use confirmCardPayment and pass the card elements directly
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement, // Includes all required card details securely
          billing_details: {
            ...addressElement.getValue().billingDetails // Ensure to get values securely
          },
        },
      });

 
      console.log("result from stripe", result); 

      if (result.error) {
        setErrorMessage(result.error.message);
        setLoading(false);
        return; 
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setPaymentSuccess(true);
          setPaymentSuccess(true);
          console.log('Payment successful!');
          console.log("Service reults:", serviceResults);
          var selectedService =  currentQuote.expressSelescted ? 
              serviceResults.filter(res => res.ServiceName === 'TG Express Worldwide') :
              serviceResults.filter(res => res.ServiceName === 'TG International Economy');

          selectedService = selectedService[0];
          console.log("Selected service", selectedService);

          var collectionService = selectedService.CollectionOptions.filter(res => res.CollectionOptionTitle === "DHLParcel");
          if(collectionService.length == 0){
            collectionService = selectedService.CollectionOptions.filter(res => res.CollectionOptionTitle === "DHLParcelMulti");
          }
          collectionService = collectionService[0];

          console.log("Collection option", collectionService);

          var shipmentObject = {
            "Shipment": {
                "Consignment": {
                    "ItemType": "Parcel",
                    "ItemsAreStackable": true,
                    "ConsignmentSummary": "Stationary",
                    "ConsignmentValue": 50.45,
                    "ConsignmentCurrency":{
                        "CurrencyCode": "GBP"
                    },
                    "Packages": currentQuote?.packages 
                },
                "CollectionAddress": currentQuote?.collectionAddress,
                "DeliveryAddress":  currentQuote?.destinationAddress
            },  
            "BookDetails": {
                "ServiceID": selectedService.ServiceID,
                "YourReference": "OurIdCOuldSaveThisObjinFB",
                "ShippingCharges": currentQuote.actualPrice,
                "Collection": {
                    "CollectionDate": currentQuote.collectionDate,
                    "ReadyFrom": "12:30",
                    "CollectionOptionID": collectionService.CollectionOptionID
                }, 
                "Insurance": {
                    "CoverValue": 50,
                    "ExcessValue": 0,
                    "GoodsAreNew": true,
                    "GoodsAreFragile": false
                }
            }
        };

        //store shipment obj in firebase: 
        TGE_ENDPOINTS.bookShipment( shipmentObject, onBookShipment); 
        } 
      }    

     
  };
 

  const onBookShipment = (response, shipment) => {
    console.log("On bookshipment .data: ", response.data);

    var storedQuote = {
      shipmentRequest: shipment,
      status: response.data.Status,
      email: currentQuote.collectionAddress.EmailAddress,
      builtQuote: currentQuote
    }

    if(response.status == 200  && response.data.Status == 'SUCCESS'){
      dispatch(bookingAction.updateBooking(response.data));
     
      const labelsHtml = response.data.Labels.map((label, index) => `
        <p> ${label.DownloadURL}</p><br>
      `).join('');
 
      var successEmail = {
        to: currentQuote.collectionAddress.EmailAddress,
        message: {
            subject: 'Your booking was successful: ' + response.data.OrderReference,
            html: `
            <!doctype html>
                <html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <title>Simple Transactional Email</title>
                    <style media="all" type="text/css"> 
                    
                    body {
                    font-family: Arial, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    font-size: 16px;
                    line-height: 1.3;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                    }
                    
                    table {
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    width: 100%;
                    }
                    
                    table td {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    vertical-align: top;
                    }
                      
                    
                    body {
                    background-color: #f4f5f6;
                    margin: 0;
                    padding: 0;
                    }
                    
                    .body {
                    background-color: #f4f5f6;
                    width: 100%;
                    }
                    
                    .container {
                    margin: 0 auto !important;
                    max-width: 600px;
                    padding: 0;
                    padding-top: 24px;
                    width: 600px;
                    }
                    
                    .content {
                    box-sizing: border-box;
                    display: block;
                    margin: 0 auto;
                    max-width: 600px;
                    padding: 0;
                    } 
                    
                    .main {
                    background: #c9e4dc;
                    border: 1px solid #f7f7f7;
                    border-radius: 16px;
                    width: 100%;
                    }
                    
                    .wrapper {
                    box-sizing: border-box;
                    padding: 24px;
                    }
                    
                    .footer {
                    clear: both;
                    padding-top: 24px;
                    text-align: center;
                    width: 100%;
                    }
                    
                    .footer td,
                    .footer p,
                    .footer span,
                    .footer a {
                    color: #e2e4e3;
                    font-size: 16px;
                    text-align: center;
                    } 
                    
                    p {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    font-weight: normal;
                    margin: 0;
                    margin-bottom: 16px;
                    }
                    
                    a {
                    color: #1d1d1b;
                    text-decoration: underline;
                    } 
                    
                    .btn {
                    box-sizing: border-box;
                    min-width: 100% !important;
                    width: 100%;
                    }
                    
                    .btn > tbody > tr > td {
                    padding-bottom: 16px;
                    }
                    
                    .btn table {
                    width: auto;
                    }
                    
                    .btn table td {
                    background-color: #ffffff;
                    border-radius: 4px;
                    text-align: center;
                    }
                    
                    .btn a {
                    background-color: #1d1d1b;
                    border: solid 2px #1d1d1b;
                    border-radius: 4px;
                    box-sizing: border-box;
                    color: #1d1d1b;
                    cursor: pointer;
                    display: inline-block;
                    font-size: 16px;
                    font-weight: bold;
                    margin: 0;
                    padding: 12px 24px;
                    text-decoration: none;
                    text-transform: capitalize;
                    }
                    
                    .btn-primary table td {
                    background-color: #1d1d1b;
                    }
                    
                    .btn-primary a {
                    background-color: #1d1d1b;
                    border-color: #1d1d1b;
                    color: #f7f7f7;
                    }
                    
                    @media all {
                    .btn-primary table td:hover {
                        background-color: #f7f7f7 !important;
                    }
                    .btn-primary a:hover {
                        background-color: #f7f7f7 !important;
                        border-color: #f7f7f7 !important;
                    }
                    } 
                    
                    .last {
                    margin-bottom: 0;
                    }
                    
                    .first {
                    margin-top: 0;
                    }
                    
                    .align-center {
                    text-align: center;
                    }
                    
                    .align-right {
                    text-align: right;
                    }
                    
                    .align-left {
                    text-align: left;
                    }
                    
                    .text-link {
                    color: #0867ec !important;
                    text-decoration: underline !important;
                    }
                    
                    .clear {
                    clear: both;
                    }
                    
                    .mt0 {
                    margin-top: 0;
                    }
                    
                    .mb0 {
                    margin-bottom: 0;
                    }
                    
                    .preheader {
                    color: transparent;
                    display: none;
                    height: 0;
                    max-height: 0;
                    max-width: 0;
                    opacity: 0;
                    overflow: hidden;
                    mso-hide: all;
                    visibility: hidden;
                    width: 0;
                    }
                    
                    .powered-by a {
                    text-decoration: none;
                    }
                      
                    
                    @media only screen and (max-width: 640px) {
                    .main p,
                    .main td,
                    .main span {
                        font-size: 16px !important;
                    }
                    .wrapper {
                        padding: 8px !important;
                    }
                    .content {
                        padding: 0 !important;
                    }
                    .container {
                        padding: 0 !important;
                        padding-top: 8px !important;
                        width: 100% !important;
                    }
                    .main {
                        border-left-width: 0 !important;
                        border-radius: 0 !important;
                        border-right-width: 0 !important;
                    }
                    .btn table {
                        max-width: 100% !important;
                        width: 100% !important;
                    }
                    .btn a {
                        font-size: 16px !important;
                        max-width: 100% !important;
                        width: 100% !important;
                    }
                    } 
                    
                    @media all {
                    .ExternalClass {
                        width: 100%;
                    }
                    .ExternalClass,
                    .ExternalClass p,
                    .ExternalClass span,
                    .ExternalClass font,
                    .ExternalClass td,
                    .ExternalClass div {
                        line-height: 100%;
                    }
                    .apple-link a {
                        color: inherit !important;
                        font-family: inherit !important;
                        font-size: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                        text-decoration: none !important;
                    }
                    #MessageViewBody a {
                        color: inherit;
                        text-decoration: none;
                        font-size: inherit;
                        font-family: inherit;
                        font-weight: inherit;
                        line-height: inherit;
                    }
                    }
                    </style>
                </head>
                <body>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                    <tr>
                        <td>&nbsp;</td>
                        <td class="container">
                        <div class="content">

                            <!-- START CENTERED WHITE CONTAINER -->
                            <span class="preheader">Your booking has gone through: </span>
                        
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">
                            <!-- START MAIN CONTENT AREA -->
                            <tr>
                                <td class="wrapper">
                                    <center><img src="https://relexco.com/static/media/relexco-nobg.b577f8ecf33c5d61348f.png" alt=""/></center><br>

                                <h3>Order confirmation</h3>
                                <br>
                                <p>Collection time: ${currentQuote.collectionDate}</p> <br>
                                <p>Tracking url: ${response.data.TrackingURL} </p> <br>
                                <p>Label download url: </p> <br>
                                 ${labelsHtml} 
                                <p>Large parcels: ${currentQuote.largeBoxes}  </p> <br>
                                <p>Small parcels: ${currentQuote.smallBoxes} </p> <br>
                                <p>From:</p>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">
                                    <tbody>
                                    <tr>
                                        <td align="left">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                <td><p>Street:</p></td>
                                                <td><p>${currentQuote.collectionAddress.AddressLineOne} </p></td>
                                                </tr>
                                                <tr>
                                                <td><p>City:</p></td>
                                                <td><p>${currentQuote.collectionAddress.City} </p></td>
                                                </tr>
                                                <tr>
                                                <td><p>County:</p></td>
                                                <td><p>${currentQuote.collectionAddress.County} </p></td>
                                                </tr>
                                                <tr>
                                                <td><p>Postal Code:</p></td>
                                                <td><p>${currentQuote.collectionAddress.Postcode} </p></td>
                                                </tr>
                                                <tr>
                                                <td><p>Country Code:</p></td>
                                                <td><p> ${currentQuote.collectionAddress.Country.CountryCode} </p></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table><br>
 
                                <p>To:</p>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">
                                    <tbody>
                                    <tr>
                                        <td align="left">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                <td><p>Street:</p></td>
                                                <td><p>${currentQuote.destinationAddress.AddressLineOne} </p></td>
                                                </tr>
                                                <tr>
                                                <td><p>City:</p></td>
                                                <td><p>${currentQuote.destinationAddress.City} </p></td>
                                                </tr>
                                                <tr>
                                                <td><p>County:</p></td>
                                                <td><p>${currentQuote.destinationAddress.County} </p></td>
                                                </tr>
                                                <tr>
                                                <td><p>Postal Code:</p></td>
                                                <td><p>${currentQuote.destinationAddress.Postcode} </p></td>
                                                </tr>
                                                <tr>
                                                <td><p>Country Code:</p></td>
                                                <td><p> ${currentQuote.destinationAddress.Country.CountryCode} </p></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table><br>    
                              
                                  
                                <p>Warm regards, Relexco</p><br>
                                <br>

                                </td>
                            </tr> 
                            </table>
                
                            <div class="footer">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                <td class="content-block">
                                    <span class="apple-link">Relexco LTD</span>
                                </td>
                                </tr>
                                <tr>
                                <td class="content-block powered-by">
                                    <p>Powered by Relexco</p>
                                </td>
                                </tr>
                            </table>
                            </div> 
                        </td>
                        <td>&nbsp;</td>
                    </tr>
                    </table>
                </body>
                </html>
            `,
        },
        };
        EMAIL_SERVICE.sendEmail(successEmail, onSendEmail);   

    }
 
    response.data.Documents = [];
    response.data.Labels = []
    storedQuote[response] = response.data;   
    console.log("trying to save,", storedQuote);
    QUOTE_SERVICE.createQuote(storedQuote, onStoreShipmentRequest);

    navigate("/order-confirmation?status="+response.data.Status);

  }
  
  const onSendEmail = (resp) => {
    console.log("onSendEmail", resp);
  }


  const onStoreShipmentRequest = (resp) => {
    console.log("onStoreShipmentRequest", resp);
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 mx-auto pt-10 px-10 pb-20">
      <div className="col-span-3 overflow-x-scroll">  
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Payment</h1>
        <p className="text-center py-4">Please provide your payment details below</p>
        <form className="pt-4 mt-2 max-w-xl mx-auto text-center border-2 border-secondary p-4 rounded-xl" onSubmit={handleSubmit}>
            <AddressElement options={{mode: 'billing'}}/>
          <div className="mt-8">
            <CardNumberElement id="card-number" options={cardElementOptions} />
            <CardExpiryElement id="card-expiry" options={cardElementOptions} />
            <CardCvcElement id="card-cvc" options={cardElementOptions} /> 
          </div>
        
          {loading ? (
                <i class="fa-solid fa-spinner fa-spin text-lg"></i>  
            ) : (
            <button className="button mt-8 w-full block mx-auto" type="submit" disabled={!stripe}>
              Pay
            </button>
          )}   
        </form>
      </div>
      <div className="col-span-1">
        <QuoteDisplay /> 
      </div>
    </div>
  );
}