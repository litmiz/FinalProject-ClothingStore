require("../data/database");
const express = require("express");
const router = express.Router();
const catalogModel = require("../models/catalog");

router.get("/", (req, res) => {
    catalogModel.find({}, (error, data) => {
        console.log("inside find");
        if (error) {
            console.error("There is an error with the get request.");
        }
        else {
            console.log("not error");
            res.send(data);
        };
    })
});

router.post("/", (req, res) => {
    catalogModel.findOne({})
        .exec(function(error, item) {
            const newItem = new catalogModel({
                title: req.body.title,
                itemType: req.body.itemType,
                category: req.body.category,
                type: req.body.type,
                size: req.body.size,
                images: req.body.images,
                price: req.body.price,
                sale: req.body.sale,
                salePrice: req.body.salePrice,
                description: req.body.description,
                inStock: req.body.inStock,
                addDate: req.body.addDate,
            })
            newItem.markModified("size");
            newItem.markModified("description");
            newItem.save().then(() => console.log(`${req.body.title} saved in the Catalog DB`));
        })
});

router.put('/', (req, res) => {
    const query = {_id: req.body._id};
    catalogModel.findOneAndUpdate(query, {$set: {title: req.body.title, itemType: req.body.itemType, category: req.body.category, type: req.body.type, size: req.body.size, images: req.body.images, price: req.body.price, sale: req.body.sale, salePrice: req.body.salePrice, description: req.body.description, inStock: req.body.inStock, addDate: req.body.addDate}}, (error, data) => {
        if (error) {
            console.error("The is an error with the put request.");
        }
        else {
            res.send(data);
        }
    });
})

router.delete('/', (req, res) => {
    catalogModel.findOneAndDelete({_id: req.body._id}, (error) => {
        if (error) {
            console.error("There is an error with the delete request");
        }
        else {
            res.send("The item had deleted");
        }
    })
})

module.exports = router;