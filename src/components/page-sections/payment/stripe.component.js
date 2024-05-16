import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// pk_live_51P6COu02R2DxG1YvL9H87F0EGviewVbTML2Gi3SqbRkuFz9ZARUvhGsmLUq7rvzBdJMOP9VRo0yyAdF5VxeOkISR00TbZ0oA82
const stripePromise = loadStripe("stripekey");

const appearance = {
  theme: 'stripe' // Specify the theme as 'stripe'
};

// Define different styles for your CardElement
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
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      // send id to server, create PaymentIntent and confirm payment
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-10 px-10 pb-20">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Payment</h1>
      <p className="text-center pt-4">Please provide your card details below</p>
      <form className="pt-4 max-w-xl mx-auto text-center" onSubmit={handleSubmit}>
        <div className="border-2 border-secondary p-4 rounded-xl">
            <CardElement options={cardElementOptions} /> {/* Add options prop */}
        </div>
      
        <button className="button mt-8 w-full block mx-auto" type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
}