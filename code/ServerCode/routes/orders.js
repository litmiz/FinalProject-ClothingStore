require("../data/database");
const express = require("express");
const router = express.Router();
const orderModel = require("../models/orders");
const userModel = require("../models/users");
const catalogModel = require("../models/catalog");
const nodeMailer = require("../modules/nodeMailer");
const currencyAPI = require('../modules/currencyAPI');
const verify = require('../modules/verifyToken');

const itemsLimit = 10;

router.get("/myOrders", (req, res) => {
    const currentPage = req.query.page;
    orderModel.find({ userId: req.query.userId })
        .skip(itemsLimit * currentPage)
        .limit(itemsLimit)
        .exec((error, data) => {
            if (error) {
                console.error("There is an error with the get request.");
            }
            else {
                if (req.query.currency == "ILS") {
                    currencyAPI.getCurrency(req.query.currency).then(multBy => {
                        sendMyOrders(data, res, multBy);
                    });
                } else {
                    sendMyOrders(data, res, 1);
                }
            };
        })
});

function sendMyOrders(data, res, multBy) {
    let orders = [];
    data.forEach(order => {
        if (order.status !== "shoppingBag") {
            orders.push({
                items: order.items,
                status: order.status,
                amountToPay: order.amountToPay * multBy,
                country: order.country,
                city: order.city,
                address: order.address,
            });
        }
    });
    res.send({ orders });
}

router.get("/shoppingBag", verify.verifyToken, (req, res) => {
    const payload = verify.getPayload(req);
    const userId = payload._id;
    orderModel.findOne({ userId: userId, status: "shoppingBag" }).exec((error, data) => {
        if (error) {
            console.error("There is an error with the get request.");
        }
        else {
            if (req.query.currency == "ILS") {
                currencyAPI.getCurrency(req.query.currency).then(multBy => {
                    sendShoppingBag(data, res, multBy);
                });
            } else {
                sendShoppingBag(data, res, 1);
            }
        };
    })
});

function sendShoppingBag(order, res, multBy) {
    let items = [];
    order.items.forEach(e => {
        items.push(Object.keys(e)[0]);
        console.log(e);
    });
    catalogModel.find().where('_id').in(items).exec((err, records) => {
        let amountToPay = 0;
        let images = [];
        let prices = [];
        let objects = {};
        records.forEach(o => objects[o._id] = o);
        let dupItems = items.map(id => objects[id]);
        dupItems.forEach(e => {
            console.log(e.id);
            amountToPay += (e.price * multBy);
            images.push(e.images[0]);
            prices.push(e.price * multBy);

        });
        let orderOut = {
            items: order.items,
            status: order.status,
            amountToPay: amountToPay,
            country: order.country,
            city: order.city,
            address: order.address,
            images: images,
            prices: prices,
        }
        res.send(orderOut);
    });
}

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
                if (req.query.currency == "ILS") {
                    currencyAPI.getCurrency(req.query.currency).then(multBy => {
                        sendAllOrders(data, res, multBy);
                    });
                } else {
                    sendAllOrders(data, res, 1);
                }
            };
        })
});

function sendAllOrders(data, res, multBy) {
    let orders = [];
    data.forEach(order => {
        orders.push({
            userId: order.userId,
            items: order.items,
            status: order.status,
            amountToPay: order.amountToPay * multBy,
            country: order.country,
            city: order.city,
            address: order.address,
            payment: order.payment,
        });
    });
    res.send({ orders });
}

router.put("/addToShoppingBag", verify.verifyToken, (req, res) => {
    const payload = verify.getPayload(req);
    const userId = payload._id;

    orderModel.findOne({ userId: userId, status: "shoppingBag" }, (error, foundOrder) => {
        let cont = true;
        if (error) {
            console.error("There is an error with the put request.");
            cont = false;
        } else if (!foundOrder) {
            foundOrder = new orderModel({
                userId: userId,
                items: [],
                status: "shoppingBag",
                amountToPay: 0,
            })
        }
        if (cont) {
            catalogModel.find().where('_id').in(Object.keys(req.body.item)).exec((err, records) => {
                if (req.body.add) {
                    foundOrder.items.push(req.body.item);
                } else {
                    let r = -1;
                    for (let i = 0; i < foundOrder.items.length; i++) {
                        const e = foundOrder.items[i];
                        if (Object.keys(req.body.item)[0] == Object.keys(e)[0] && Object.values(req.body.item)[0] == Object.values(e)[0]) {
                            r = i;
                            break;
                        }
                    }
                    if (r >= 0) {
                        foundOrder.items.splice(r, 1); // Remove first found item
                    }
                }
                foundOrder.save().then(() => {
                    res.send(true);
                });
            });
        }
    });
});

router.put('/editMyOrder', (req, res) => {
    const query = { _id: req.body._id };
    orderModel.findOne(query, (error, foundOrder) => {
        if (error) {
            console.error("There is an error with the put request.");
        }
        else if (foundOrder.userId == req.body.userId) {
            orderModel.findOneAndUpdate(query, {
                $set: {
                    status: req.body.status,
                }
            }, (error, data) => {
                if (error) {
                    console.error("The is an error with the put request.");
                }
                else {
                    res.send(true);
                    if (req.body.status == 'ordered') {
                        userModel.findOne({ _id: req.body.userId }, (error, user) => {
                            if (error) {
                                console.error(`The is an error finding the user ${req.body.userId}.`);
                            } else {
                                nodeMailer.sendMail(user.email, "Order Confirmation",
                                    `Dear ${user.fullName}, your order ${foundOrder._id} has been received. The order will be delivered to you soon.`)
                            }
                        });
                        catalogModel.find().where('_id').in(foundOrder.items).exec((err, records) => {
                            let amountSum = 0;
                            records.forEach(item => {
                                amountSum += item.price;
                            });
                            foundOrder.amountToPay = amountSum;
                            foundOrder.save().then(() => {
                                res.send(true);
                            });
                        });
                    } else if (req.body.status == 'cancelRequest') {
                        userModel.findOne({ _id: req.body.userId }, (error, user) => {
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
    const query = { _id: req.body._id };
    orderModel.findOneAndUpdate(query, {
        $set: {
            status: req.body.status,
        }
    }, (error, order) => {
        if (error) {
            console.error("The is an error with the put request.");
        }
        else {
            res.send(true);
            if (req.body.status == 'shipped') {
                userModel.findOne({ _id: order.userId }, (error, user) => {
                    if (error) {
                        console.error(`The is an error finding the user ${order.userId}.`);
                    } else {
                        nodeMailer.sendMail(user.email, "Order Shipped",
                            `Dear ${user.fullName}, your order ${order._id} has been shipped to you. The order will soon arrive to you at ${order.address}, ${order.city}, ${order.country}.`)
                    }
                });
            } else if (req.body.status == 'delivered') {
                userModel.findOne({ _id: order.userId }, (error, user) => {
                    if (error) {
                        console.error(`The is an error finding the user ${order.userId}.`);
                    } else {
                        nodeMailer.sendMail(user.email, "Order Delivered",
                            `Dear ${user.fullName}, your order ${order._id} has been delivered to you. If you didn't receive the order, please contact us.`)
                    }
                });
            } else if (req.body.status == 'cancelled') {
                userModel.findOne({ _id: order.userId }, (error, user) => {
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