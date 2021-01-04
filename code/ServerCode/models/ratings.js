const mongoose = require("mongoose");
const {stringify} = require("querystring");

const ratingSchema = mongoose.Schema(
    {
        userId:String,
        itemId:String,
        rating:Number,
        sizeRating:String,
        colorRating:String,
        comfortRating:String
    }
)

module.exports = mongoose.model("ratings", ratingSchema, "Ratings");