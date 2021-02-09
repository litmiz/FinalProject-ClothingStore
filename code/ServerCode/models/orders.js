const mongoose = require("mongoose");
const {stringify} = require("querystring");

const orderSchema = mongoose.Schema(
    {
        userId:String,
        items:[],
        status:String,
        amountToPay:Number,
        country:String,
        city:String,
        address:String,
        payment:String
    }
)

module.exports = mongoose.model("orders", orderSchema, "Orders");