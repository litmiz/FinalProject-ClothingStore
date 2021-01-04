require("../data/database");
const express = require("express");
const router = express.Router();
const ratingModel = require("../models/ratings");

router.get("/", (req, res) => {
    ratingModel.find({}, (error, data) => {
        if (error) {
            console.error("There is an error with the get request.");
        }
        else {
            res.send(data);
        };
    })
});

router.post("/", (req, res) => {
    ratingModel.findOne({})
        .exec(function(error, rating) {
            const newRating = new ratingModel({
                userId: req.body.userId,
                itemId: req.body.itemId,
                rating: req.body.rating,
                sizeRating: req.body.sizeRating,
                colorRating: req.body.colorRating,
                comfortRating: req.body.comfortRating,
            })
            newRating.save().then(() => console.log(`The rating of ${req.body.userId} is saved in the DB`));
        })
});

router.put('/', (req, res) => {
    const query = {_id: req.body._id};
    ratingModel.findOneAndUpdate(query, {$set: {userId: req.body.userId, itemId: req.body.itemId, rating: req.body.rating, sizeRating: req.body.sizeRating, colorRating: req.body.colorRating, comfortRating: req.body.comfortRating,}}, (error, data) => {
        if (error) {
            console.error("The is an error with the put request.");
        }
        else {
            res.send(data);
        }
    });
})

// router.delete('/', (req, res) => {
//     ratingModel.findOneAndDelete({_id: req.body._id}, (error) => {
//         if (error) {
//             console.error("There is an error with the delete request");
//         }
//         else {
//             res.send(`ID ${req.body._id} rating was deleted`);
//         }
//     })
// })

module.exports = router;