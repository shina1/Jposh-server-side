import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY)


const stripePayment = async(req, res) => {
  try {
    await stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "euro",
    }, (stripeErr, stripeRes) => {
        if(stripeErr) return res.status(500).json(stripeErr)
        return res.status(200).json(stripeRes)
    })
  } catch (error) {
      res.status(500).json(error)
  }
}


export{
    stripePayment
}