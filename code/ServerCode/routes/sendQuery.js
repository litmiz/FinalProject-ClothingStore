require('dotenv').config()
const express = require("express");
const router = express.Router();
const nodeMailer = require("../modules/nodeMailer");
const queryTypes = ["no type", "suggestion", "complaint", "idea", "Looking for a job"]

router.post("/", (req, res) => {
    nodeMailer.sendMail(process.env.EMAIL, `${queryTypes[ req.body.queryType]} - from ${req.body.fullName}`, `${req.body.queryContent}\n\n Customer email - ${req.body.email}`);
    console.log(req.body);
    res.end();
    // ratingModel.findOne({})
    //     .exec(function(error, rating) {
    //         const newRating = new ratingModel({
    //             userId: req.body.userId,
    //             itemId: req.body.itemId,
    //             rating: req.body.rating,
    //         })
    //         newRating.save().then(() => res.send(`The rating is saved in the DB`));
    //     })
});

module.exports = router;