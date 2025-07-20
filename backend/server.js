require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const paypal = require('paypal-rest-sdk');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(bodyParser.json());

paypal.configure({
  'mode': 'sandbox', // Change to 'live' for production
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_SECRET
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.post('/api/paypal/create-payment', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "YOUR_RETURN_URL", // Replace with your frontend success URL
      "cancel_url": "YOUR_CANCEL_URL"  // Replace with your frontend cancel URL
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "item",
          "sku": "item",
          "price": "1.00", // Replace with actual item price from frontend
          "currency": "USD",
          "quantity": "1" // Replace with actual item quantity from frontend
        }]
      },
      "amount": {
        "currency": "USD",
        "total": "1.00" // Replace with total amount from frontend
      },
      "description": "This is the payment description."
    }]
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.json({ approvalUrl: payment.links[i].href });
        }
      }
    }
  });
});

app.get('/api/paypal/execute-payment', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "1.00" // Replace with the actual total amount again
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      // Payment successful, you can update your database, send email, etc.
      console.log(JSON.stringify(payment));
      res.send('Payment successful!'); // Redirect or send a success response
    }
  });
});

app.post('/api/stripe/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // Get the amount from the frontend

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});