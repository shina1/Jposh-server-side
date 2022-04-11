import mongoose from "mongoose";

const {Schema} = mongoose

const ProductSchema = Schema(
    {
       title: {
           type: String,
           required: true,
           unique: true
       } ,
       desc: {
           type: String,
           required: true,
       },
       img: {type: String, required: true,},
       category: {type: String, required: true},
       size: {type: Array},
       color: {type: Array},
       price: {type: Number, required: true},
       inStock: {type: Boolean, default: true}
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', ProductSchema)

export default Product