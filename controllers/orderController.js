import asyncHandler from "express-async-handler"
import Cart from "../models/CartModel.js"
import Order from "../models/OrderModel.js"

// @desc Create new Order
//  @route Post/api/v1/orders
// @access Private

const addOrderItems = asyncHandler(async(req, res) => {
    const newOrder = new Order(req.body)
    if(!newOrder){
        return res.status(400).json("No order found")
    }
    try {
        const createdOrder = await newOrder.save()
        return res.status(200).json(createdOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})


// @desc Update Order
//  @route Post/api/v1/orders/update/${id}
// @access Private
const updateOrder = asyncHandler(async(req, res) => {
    try {
        const updatedOrder = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
        {new: true}
        )
        res.status(200).json(updatedOrder)
    } catch (error) {
        
    }
})

// @desc Delete Order
//  @route Post/api/v1/orders/update/${id}
// @access Private

const deleteOrder = asyncHandler(async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order deleted!")
    } catch (error) {
        res.status(500).json(error)
    }
})

// @desc Get user order by id
//  @route GET /api/orders/${id}
// @access Private

const getUserOrder = async(req, res) => {
    try {
        const userOrders = await Order.findOne({userId: req.params.userId})
        res.status(200).json(userOrders)
    } catch (error) {
        res.status(500).json(error)
    }
}

// @desc Get All Orders
//  @route Post/api/v1/orders/update/${id}
// @access Private
const getAllOrder = async(req, res) => {
    try {
        const allOrders = await Order.find()
        res.status(200).json(allOrders)
    } catch (error) {
        res.status(500).json(error)
    }
}
// STATS
// @desc Get Monthly Income
//  @route Post/api/v1/orders/update/${id}
// @access Private

const getMonthlyIncome = async(req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: {createdAt : { $gte: previousMonth}}},
            {
                $project : {
                    month : {$month: "$createdAt"},
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum : "$sales"},
                }
            }
        ]);
       return res.status(200).json(income)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}


export {
    addOrderItems,
    updateOrder,
    deleteOrder,
    getUserOrder,
    getAllOrder,
    getMonthlyIncome
}


