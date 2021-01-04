require("../data/database");
const express = require("express");
const router = express.Router();
const userModel = require("../models/users");

router.get("/", (req, res) => {
    userModel.find({}, (error, data) => {
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
    userModel.findOne({})
        .exec(function(error, item) {
            const newItem = new userModel({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                city: req.body.city,
                country: req.body.country,
                favoriteItems: req.body.favoriteItems,
                permissionLevel: req.body.permissionLevel,
                currency: req.body.currency,
            })
            newItem.save().then(() => console.log(`${req.body.fullName} saved in the Users DB`));
        })
});

router.put('/', (req, res) => {
    const query = {_id: req.body._id};
    userModel.findOneAndUpdate(query, {$set: {fullName: req.body.fullName, email: req.body.email, password: req.body.password, phoneNumber: req.body.phoneNumber, address: req.body.address, city: req.body.address, country: req.body.country, favoriteItems: req.body.favoriteItems, permissionLevel: req.body.permissionLevel, currency: req.body.currency,}}, (error, data) => {
        if (error) {
            console.error("The is an error with the put request.");
        }
        else {
            res.send(data);
        }
    });
})

router.delete('/', (req, res) => {
    userModel.findOneAndDelete({_id: req.body._id}, (error) => {
        if (error) {
            console.error("There is an error with the delete request");
        }
        else {
            res.send(`ID ${req.body._id} was deleted`);
        }
    })
})

module.exports = router;