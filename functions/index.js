const functions = require('firebase-functions');
const  { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51P6COu02R2DxG1YvYDUAhrs3kDbnwLbuqhNCBnbdj0tlvE07uQ3J6HuWX4aVW05gG9VwHDwOXDrZUHkxNB7RvyZU00ngPoXRy1');

admin.initializeApp();

//exports.createPaymentIntent = onRequest(async (req, res) => {
exports.createPaymentIntent = onRequest({ cors: true }, async (req, res) => { 
  try {
    console.log("Request", req);
    console.log("Request body", req.body);
    const { amount, currency } = req.body;

    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
    });

    console.log("Payment Intent", paymentIntent);

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

 