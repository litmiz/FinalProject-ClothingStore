const mongoose = require("mongoose");
const {stringify} = require("querystring");

const catalogSchema = mongoose.Schema(
    {
        title:String,
        itemType:String,
        category:String,
        type:String,
        size:mongoose.Schema.Types.Mixed,
        images:[String],
        price:Number,
        sale:Boolean,
        oldPrice:Number,
        description:mongoose.Schema.Types.Mixed,
        inStock:Boolean,
        addDate:String
    }
)

module.exports = mongoose.model("catalog", catalogSchema, "Catalog");