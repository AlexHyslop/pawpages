import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// pk_live_51P6COu02R2DxG1YvL9H87F0EGviewVbTML2Gi3SqbRkuFz9ZARUvhGsmLUq7rvzBdJMOP9VRo0yyAdF5VxeOkISR00TbZ0oA82
const stripePromise = loadStripe("stripekey");

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
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}
