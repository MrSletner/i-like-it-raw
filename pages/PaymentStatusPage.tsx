import React, { useEffect, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const PaymentStatusPage = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState<string | null>(null);

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
          setMessage("Payment Succeeded!");
          // You might want to clear the cart here or show order details
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
  }, [stripe]);

  return (
    <div className="payment-status-container">
      <h1>Payment Status</h1>
      <p>{message}</p>
    </div>
  );
};

export default PaymentStatusPage;