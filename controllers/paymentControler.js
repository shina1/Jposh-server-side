import Stripe from "stripe";
import { v4 as uuidv4 } from 'uuid';

import User from "../models/UserModel.js";

const idempotencyKey = uuidv4();
const stripe = new Stripe(`${process.env.STRIPE_TEST_KEY}`)


const stripePayment = async(req, res) => {
  const {headers, stripeToken, amount, product} = req.body
  
  return stripe.customers.create({
      email: stripeToken.email,
      source: stripeToken.id,
  }).then(customer => {
    stripe.charges.create({
      amount: amount,
      currency: "gbp",
      customer: customer.id,
      receipt_email: stripeToken.email,
      description: `Purchase of product successful`,
      shipping: {
        name: stripeToken.card.name,
        address: {
          city: stripeToken.card.address_city,
          country: stripeToken.card.address_city
        }
      }
    }, {idempotencyKey})
  }).then(result => {
    if(result){
      res.status(200).json(result)
    }
    else{
      console.log('something went wrong');
    }
    
  }
    )
  .catch(err => {throw new Error(err)})
}




export{
    stripePayment
}

