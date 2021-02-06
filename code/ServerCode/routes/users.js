require("../data/database");
const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const bcrypyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;
const verify = require('../modules/verifyToken');

router.get("/myPersonalInfo", (req, res) => {
    userModel.findOne({email:req.query.email}, (error, data) => {
        if (error) {
            console.error("There is an error with the get request.");
        }
        else {
            res.send({
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                address: data.address,
                city: data.city,
                country: data.country,
                favoriteItems: data.favoriteItems,
            });
        };
    })
});

router.get("/usersPermissions", (req, res) => {
    const currentPage = req.query.page;
    const itemsLimit = 10;
    userModel.find({})
             .skip(itemsLimit * currentPage)
             .limit(itemsLimit)
             .exec((error, data) => {
        if (error) {
            console.error("There is an error with the get request.");
        }
        else {
            let users = [];
            data.forEach(user => {
                users.push({fullName: user.fullName, email: user.email, permissionLevel: user.permissionLevel,})
            });
            res.send({users});
        };
    })
});


// router.post("/", (req, res) => {
//     userModel.findOne({})
//         .exec(function(error, user) {
//             const newUser = new userModel({
//                 fullName: req.body.fullName,
//                 email: req.body.email,
//                 password: req.body.password,
//                 phoneNumber: req.body.phoneNumber,
//                 address: req.body.address,
//                 city: req.body.city,
//                 country: req.body.country,
//                 favoriteItems: req.body.favoriteItems,
//                 permissionLevel: req.body.permissionLevel,
//                 currency: req.body.currency,
//             })
//             newUser.save().then(() => console.log(`${req.body.fullName} saved in the Users DB`));
//         })
// });

router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send('All fields are required!');
        return;
    }
    userModel.findOne({email:req.body.email}, (error, user) => {
        if (error) {
            res.status(500).send("There is an error with the login");
            return;
        }
        if (!user) {
            res.status(400).send("No such user");
            return;
        } else {
            bcrypyt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    let payload = {subject: user._id};
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({token});
                } else {
                    res.status(400).send("Login failed! :(");
                    return;
                }
            })
        }
    })
});

router.post('/register', (req, res) => {
    let userData = req.body;
    if (userData.email && userData.password) {
        bcrypyt.hash(req.body.password, salt, (err, hash) => {
            const newUser = new userModel({
                fullName: req.body.fullName,
                email: req.body.email,
                password: hash,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                city: req.body.city,
                country: req.body.country,
                favoriteItems: req.body.favoriteItems,
                permissionLevel: 'client',
                currency: req.body.currency,
            })
            newUser.save((err, registeredUser) => {
                if (err) {
                    console.error(err)
                } else {
                    let payload = {subject: registeredUser._id};
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({token});
                }
            })
        })
    }
});

router.put('/editMyInfo', (req, res) => {
    const query = {_id: req.body._id};
    userModel.findOneAndUpdate(query, {$set: {fullName: req.body.fullName, email: req.body.email, phoneNumber: req.body.phoneNumber, address: req.body.address, city: req.body.address, country: req.body.country, favoriteItems: req.body.favoriteItems,}}, (error, data) => {
        if (error) {
            console.error("The is an error with the put request.");
        }
        else {
            res.send(data);
        }
    });
});

router.put('/changePassword', (req, res) => {
    const query = {_id: req.body._id};
    bcrypyt.hash(req.body.password, salt, (err, hash) => {
        userModel.findOneAndUpdate(query, {$set: {password: hash,}}, (error, data) => {
            if (error) {
                console.error("The is an error with the put request.");
                res.send(false);
            }
            else {
                res.send(true);
            }
        });
    })
});

router.put('/editPermission', (req, res) => {
    const query = {_id: req.body._id};
    userModel.findOneAndUpdate(query, {$set: {permissionLevel: req.body.permissionLevel,}}, (error, data) => {
        if (error) {
            console.error("The is an error with the put request.");
            res.send(false);
        }
        else {
            res.send(true);
        }
    })
});

router.delete('/deleteUser', (req, res) => {
    userModel.findOneAndDelete({_id: req.body._id}, (error) => {
        if (error) {
            console.error("There is an error with the delete request");
            res.send(false);
        }
        else {
            res.send(`ID ${req.body._id} was deleted`);
        }
    })
})

module.exports = router;