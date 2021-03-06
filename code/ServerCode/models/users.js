const mongoose = require("mongoose");
const {stringify} = require("querystring");

const userSchema = mongoose.Schema(
    {
        fullName:String,
        email:String,
        password:String,
        phoneNumber:String,
        address:String,
        city:String,
        country:String,
        favoriteItems:[mongoose.Schema.Types.ObjectId],
        permissionLevel:String,
        currency:String
    }
)

module.exports = mongoose.model("users", userSchema, "Users");