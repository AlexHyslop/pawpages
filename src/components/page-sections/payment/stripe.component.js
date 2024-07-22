import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements } from "@stripe/react-stripe-js";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, AddressElement } from "@stripe/react-stripe-js";
import QuoteDisplay from "../../quotes/quote-display.component";
import { useSelector } from "react-redux";
import { TGE_ENDPOINTS } from "../../../api/transglobal.service";
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

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);


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
          setLoading(false);
          console.log('Payment successful!');
          console.log("Service reults:", serviceResults);
          var selectedService =  currentQuote.expressSelescted ? 
              serviceResults.filter(res => res.ServiceName === 'TG Express Worldwide') :
              serviceResults.filter(res => res.ServiceName === 'TG International Economy');

          selectedService = selectedService[0];
          console.log("Selected service", selectedService);

          var collectionService = selectedService.CollectionOptions.filter(res => res.CollectionOptionTitle === "DHLParcel");
          selectedService = selectedService[0];

          if(collectionService.length == 0){
            collectionService = selectedService.s.filter(res => res.CollectionOptionTitle === "DHLParcelMulti");
          }
          
          collectionService = collectionService[0];
          console.log("Collection option", collectionService);

          var shipmentObject = {
            "Shipment": {
                "Consignment": {
                    "ItemType": "Parcel",
                    "ItemsAreStackable": false,
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
                // "BookAccessories": [
                //     {
                //         "Code": "SIG"
                //     }
                // ],
                "Insurance": {
                    "CoverValue": 50,
                    "ExcessValue": 0,
                    "GoodsAreNew": true,
                    "GoodsAreFragile": false
                }
            }
        };

        TGE_ENDPOINTS.bookShipment( shipmentObject, onBookShipment);
        } 
      }    
  };

  const onBookShipment = (response) => {
    console.log("On bookshipment: ", response);
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
        
          <button className="button mt-8 w-full block mx-auto" type="submit" disabled={!stripe}>
            Pay
          </button>
        </form>
      </div>
      <div className="col-span-1">
        <QuoteDisplay /> 
      </div>
    </div>
  );
}