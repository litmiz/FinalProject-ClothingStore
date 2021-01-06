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
            res.send(data);
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
            res.status(400).send("Login failed! :(");
            return;
        } else {
            if (user.password == req.body.password) {
                res.status(200).send(req.body);
            } else {
                res.status(400).send("Login failed! :(");
                return;
            }
        }
    })
});

router.post('/register', (req, res) => {
    let userData = req.body;
    if (userData.email && userData.password) {
        const newUser = new userModel({
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
        newUser.save((err, registeredUser) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send("Login successed");
            }
        })
    }
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