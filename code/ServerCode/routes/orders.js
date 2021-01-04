require("../data/database");
const express = require("express");
const router = express.Router();
const orderModel = require("../models/orders");

router.get("/", (req, res) => {
    orderModel.find({}, (error, data) => {
        if (error) {
            console.error("There is an error with the get request.");
        }
        else {
            res.send(data);
        };
    })
});

router.post("/", (req, res) => {
    orderModel.findOne({})
        .exec(function(error, order) {
            const newOrder = new orderModel({
                userId: req.body.userId,
                items: req.body.items,
                status: req.body.status,
                amountToPay: req.body.amountToPay,
                country: req.body.country,
                city: req.body.city,
                address: req.body.address,
                payment: req.body.payment,
            })
            newOrder.save().then(() => console.log(`The order of ${req.body.userId} is saved in the DB`));
        })
});

router.put('/', (req, res) => {
    const query = {_id: req.body._id};
    orderModel.findOneAndUpdate(query, {$set: {userId: req.body.userId, items: req.body.items, status: req.body.status, amountToPay: req.body.amountToPay, country: req.body.country, city: req.body.city, address: req.body.address, payment: req.body.payment,}}, (error, data) => {
        if (error) {
            console.error("The is an error with the put request.");
        }
        else {
            res.send(data);
        }
    });
})

router.delete('/', (req, res) => {
    orderModel.findOneAndDelete({_id: req.body._id}, (error) => {
        if (error) {
            console.error("There is an error with the delete request");
        }
        else {
            res.send(`ID ${req.body._id} order was deleted`);
        }
    })
})

module.exports = router;