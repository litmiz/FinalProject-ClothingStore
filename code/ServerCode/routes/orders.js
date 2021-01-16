require("../data/database");
const express = require("express");
const { findOne } = require("../models/orders");
const router = express.Router();
const orderModel = require("../models/orders");
const userModel = require("../models/users");
const nodeMailer = require("../modules/nodeMailer");
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
                status: "inBag",
                amountToPay: req.body.amountToPay,
                country: req.body.country,
                city: req.body.city,
                address: req.body.address,
                payment: req.body.payment,
            })
            newOrder.save().then(() => {
                res.send(`The order is saved in the DB`);
            });
        })
});

router.put('/editMyOrder', (req, res) => {
    const query = {_id: req.body._id};
    orderModel.findOne(query, (error, foundOrder) => {
        if (error) {
            console.error("There is an error with the put request.");
        }
        else if (foundOrder.userId == req.body.userId) {
            orderModel.findOneAndUpdate(query, {$set: {
                status: req.body.status,}}, (error, data) => {
                if (error) {
                    console.error("The is an error with the put request.");
                }
                else {
                    res.send("The order has been updated.");
                    if (req.body.status == 'ordered') {
                        userModel.findOne({_id: req.body.userId}, (error, user) => {
                            if (error) {
                                console.error(`The is an error finding the user ${req.body.userId}.`);
                            } else {
                                nodeMailer.sendMail(user.email, "Order Confirmation",
                                `Dear ${user.fullName}, your order ${foundOrder._id} has been received. The order will be delivered to you soon.`)
                            }
                        });
                    } else if (req.body.status == 'cancelRequest') {
                        userModel.findOne({_id: req.body.userId}, (error, user) => {
                            if (error) {
                                console.error(`The is an error finding the user ${req.body.userId}.`);
                            } else {
                                nodeMailer.sendMail(user.email, "Order Cancellation Request",
                                `Dear ${user.fullName}, your order ${foundOrder._id} has been request to be cancelled. We will send you a cancel confirmation soon.`)
                            }
                        });
                    }
                }
            });
        };
    })
})


router.put('/editOrder', (req, res) => {
    const query = {_id: req.body._id};
    orderModel.findOneAndUpdate(query, {$set: {
        status: req.body.status,}}, (error, order) => {
        if (error) {
            console.error("The is an error with the put request.");
        }
        else {
            res.send("The order has been updated");
            if (req.body.status == 'shipped') {
                userModel.findOne({_id: order.userId}, (error, user) => {
                    if (error) {
                        console.error(`The is an error finding the user ${order.userId}.`);
                    } else {
                        nodeMailer.sendMail(user.email, "Order Shipped",
                        `Dear ${user.fullName}, your order ${order._id} has been shipped to you. The order will soon arrive to you at ${order.address}, ${order.city}, ${order.country}.`)
                    }
                });
            } else if (req.body.status == 'delivered') {
                userModel.findOne({_id: order.userId}, (error, user) => {
                    if (error) {
                        console.error(`The is an error finding the user ${order.userId}.`);
                    } else {
                        nodeMailer.sendMail(user.email, "Order Delivered",
                        `Dear ${user.fullName}, your order ${order._id} has been delivered to you. If you didn't receive the order, please contact us.`)
                    }
                });
            } else if (req.body.status == 'cancelled') {
                userModel.findOne({_id: order.userId}, (error, user) => {
                    if (error) {
                        console.error(`The is an error finding the user ${order.userId}.`);
                    } else {
                        nodeMailer.sendMail(user.email, "Order Cancelled",
                        `Dear ${user.fullName}, your order ${order._id} has been cancelled. We hope to receive other orders from you in the future.`)
                    }
                });
            }
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