import Stripe from "stripe";
import User from "../models/UserModel.js";

const stripe = new Stripe(`${process.env.STRIPE_TEST_KEY}`)

const stripePayment = async(req, res) => {
  console.log(req.body);  
   try {
   await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "gbp",
   },(stripeErr, stripeRes) => {
     if(stripeErr){ 
       return res.status(500).json(stripeErr)
     }
     return res.status(200).json(stripeRes)
 })
} catch (error) {
   res.status(500).json(error)
}
}


export{
    stripePayment
}


// const session = await stripe.checkout.sessions.create({
//   payment_method_types: ['card'],
//   line_items: [{
//     price_data: {
//       product: '{{PRODUCT_ID}}',
//       unit_amount: 1500,
//       currency: 'usd',
//     },
//     quantity: 1,
//   }],
//   mode: 'payment',
//   success_url: 'https://example.com/success',
//   cancel_url: 'https://example.com/cancel',
// });


// try {
//   console.log(req.body.tokenId.id)
//    await stripe.charges.create({
  // source: req.body.tokenId.id,
  // amount: req.body.amount,
  // currency: "gbp",
//    },(stripeErr, stripeRes) => {
//      if(stripeErr){ 
//        // console.log('the stripe error',stripeErr);
//        return res.status(500).json(stripeErr)
//      }
//      return res.status(200).json(stripeRes)
//  })
// } catch (error) {
//    res.status(500).json(error)
// }