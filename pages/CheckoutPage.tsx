import React from 'react';
import StripeCheckoutForm from '../components/StripeCheckoutForm';

const CheckoutPage = () => {
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <StripeCheckoutForm />
    </div>
  );
};

export default CheckoutPage;