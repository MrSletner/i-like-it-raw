import React, { useEffect, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { useCart } from '../hooks/useCart'; // Assuming you have a useCart hook

const PaymentStatusPage = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState<string | null>(null);
  const { cartItems, cartTotal, clearCart } = useCart(); // Get cart details and clearCart from the hook

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      setMessage("Payment intent client secret not found.");
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment Succeeded! Thank you for your purchase. We hope you enjoy your new items! Remember to visit us again soon, there's always something new for you to hear, see, or experience.");
          clearCart(); // Clear the cart on successful payment
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        case "canceled":
          setMessage("Payment canceled.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, clearCart]); // Added clearCart to the dependency array

  return (
    <div className="payment-status-container">
      <h1>Payment Status</h1>
      {message && <p>{message}</p>}

      {/* Display order details if payment succeeded */}
      {message?.startsWith("Payment Succeeded") && (
        <div className="order-details">
          <h2>Order Summary</h2>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
              </li>
            ))}
          </ul>
          <h3>Total Paid: ${cartTotal.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default PaymentStatusPage;