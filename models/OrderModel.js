import mongoose from "mongoose";

const {Schema} = mongoose;

const OrderSchema = Schema(
{
  userId: {type: String, required: true}  ,
  products: [
      {
          productId: {type: String},
          quantity: {type:Number, default: 1}
      }
  ],
  paymentMethod: {type: String, required: false},
  amount: {
      type: Number, required: true,
  },
  address: {type: Object, required: true},
  status: {type: String, default: 'pending'},
},
{
    timestamps: true
}
)

const Order = mongoose.model('Order', OrderSchema)

export default Order