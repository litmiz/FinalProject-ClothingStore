const mongoose = require("mongoose");
const { stringify } = require("querystring");

const catalogSchema = mongoose.Schema(
    {
        title:String,
        itemType:String,
        category:String,
        type:String,
        size:Schema.Types.Mixed,
        images:[String],
        price:Number,
        description:Schema.Types.Mixed,
        inStock:Boolean,
        addDate:String
    }
)

module.exports = mongoose.model("Catalog", catalogSchema);