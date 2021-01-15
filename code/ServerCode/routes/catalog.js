require("../data/database");
const express = require("express");
const router = express.Router();
const catalogModel = require("../models/catalog");
const itemsLimit = 19;

router.get("/filteredCatalog", (req, res) => {
    const currentPage = req.query.page;
    let filter = {inStock: true};
    let sort = {addDate: -1, _id: -1};
    if (req.query.itemType) {
        filter["itemType"] = req.query.itemType;
    }
    if (req.query.category) {
        filter["category"] = req.query.category;
    }
    if (req.query.type) {
        filter["type"] = req.query.type;
    }
    if (req.query.size) {
        filter[`size.${req.query.size}.inStock`] = true;
    }
    if (req.query.color) {
        filter["description.Color"] = req.query.color;
    }
    if (req.query.sortBy) {
        if (req.query.sortBy == "new") {
            sort = {addDate: -1, _id: -1};
        } else if (req.query.sortBy == "old") {
            sort = {addDate: 1, _id: -1};
        } else if (req.query.sortBy == "lowPrice") {
            sort = {price: 1, _id: -1};
        } else if (req.query.sortBy == "highPrice") {
            sort = {price: -1, _id: -1};
        }
    }
    console.log(filter);
    catalogModel.find(filter)
                .sort(sort)
                .skip(itemsLimit * currentPage)
                .limit(itemsLimit)
                .exec((error, data) => {
        if (error) {
            console.error("There is an error with the get request.");
        }
        else {
            let items = [];
            data.forEach(item => {
                items.push({
                    title: item.title,
                    itemType: item.itemType,
                    category: item.category,
                    type: item.type,
                    size: item.size,
                    images: item.images,
                    price: item.price,
                    sale: item.sale,
                    oldPrice: item.oldPrice,
                    description: item.description,
                })
            });
            res.send(items);
        };
    })
});


router.post("/addItem", (req, res) => {
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
                oldPrice: req.body.oldPrice,
                description: req.body.description,
                inStock: req.body.inStock,
                addDate: new Date().toISOString().split("T")[0],
            })
            newItem.markModified("size");
            newItem.markModified("description");
            newItem.save().then(() => {
                res.send(`${req.body.title} saved in the Catalog DB`);
            });
        })
});

router.put('/editItem', (req, res) => {
    const query = {_id: req.body._id};
    catalogModel.findOneAndUpdate(query, {$set: {
        title: req.body.title, 
        itemType: req.body.itemType,
        category: req.body.category,
        type: req.body.type,
        size: req.body.size,
        images: req.body.images,
        price: req.body.price,
        sale: req.body.sale,
        oldPrice: req.body.oldPrice,
        description: req.body.description,
        inStock: req.body.inStock}}, (error, data) => {
        if (error) {
            res.error("The is an error with the put request.");
        }
        else {
            res.send(data);
        }
    });
})

// DELETE is not in use:
// router.delete('/', (req, res) => {
//     catalogModel.findOneAndDelete({_id: req.body._id}, (error) => {
//         if (error) {
//             console.error("There is an error with the delete request");
//         }
//         else {
//             res.send(`ID ${req.body._id} was deleted`);
//         }
//     })
// })

module.exports = router;