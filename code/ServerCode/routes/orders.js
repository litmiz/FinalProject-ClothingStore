require("../data/database");
const express = require("express");
const router = express.Router();
const orderModel = require("../models/orders");
const itemsLimit = 10;

router.get("/myOrders", (req, res) => {
    const currentPage = req.query.page;
    orderModel.find({userId: req.query.userId})
              .skip(itemsLimit * currentPage)
              .limit(itemsLimit)
              .exec((error, data) => {
        if (error) {
            console.error("There is an error with the get request.");
        }
        else {
            let orders = [];
            data.forEach(order => {
                orders.push({
                    items: order.items,
                    status: order.status,
                    amountToPay: order.amountToPay,
                    country: order.country,
                    city: order.city,
                    address: order.address,
                });
            });
            res.send({orders});
        };
    })
});

router.get("/allOrders", (req, res) => {
    const currentPage = req.query.page;
    let filter = {};
    if (req.query.status) {
        filter["status"] = req.query.status;
    }
    orderModel.find(filter)
              .skip(itemsLimit * currentPage)
              .limit(itemsLimit)
              .exec((error, data) => {
        if (error) {
            console.error("There is an error with the get request.");
        }
        else {
            let orders = [];
            data.forEach(order => {
                orders.push({
                    userId: order.userId,
                    items: order.items,
                    status: order.status,
                    amountToPay: order.amountToPay,
                    country: order.country,
                    city: order.city,
                    address: order.address,
                    payment: order.payment,
                });
            });
            res.send({orders});
        };
    })
});

router.post("/shoppingBag", (req, res) => {
    orderModel.findOne({})
        .exec(function(error, order) {
            const newOrder = new orderModel({
                userId: req.body.userId, // TODO: use token
                items: req.body.items,
                status: req.body.status,
                amountToPay: req.body.amountToPay,
                country: req.body.country,
                city: req.body.city,
                address: req.body.address,
                payment: req.body.payment,
            })
            newOrder.save().then(() => res.send(`The order is saved in the DB`));
        })
});

router.put('/editMyOrder', (req, res) => {
    const query = {_id: req.body._id};
    orderModel.findOne(query, (error, foundOrder) => {
        if (error) {
            console.error("There is an error with the put request.");
        }
        else if (foundOrder.userId == req.body.userId){
            orderModel.findOneAndUpdate(query, {$set: {
                status: req.body.status,}}, (error, data) => {
                if (error) {
                    console.error("The is an error with the put request.");
                }
                else {
                    res.send(data);
                }
            });
        };
    })
})


router.put('/editOrder', (req, res) => {
    const query = {_id: req.body._id};
    orderModel.findOneAndUpdate(query, {$set: {
        status: req.body.status,}}, (error, data) => {
        if (error) {
            console.error("The is an error with the put request.");
        }
        else {
            res.send(data);
        }
    });
})

// router.delete('/', (req, res) => {
//     orderModel.findOneAndDelete({_id: req.body._id}, (error) => {
//         if (error) {
//             console.error("There is an error with the delete request");
//         }
//         else {
//             res.send(`ID ${req.body._id} order was deleted`);
//         }
//     })
// })

module.exports = router;