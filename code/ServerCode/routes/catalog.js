require("../data/database");
const express = require("express");
const router = express.Router();
const catalogModel = require("../models/catalog");

router.get("/", (req, res) => {
    catalogModel.find({}, (error, data) => {
        if (error) {
            console.log("There is an error with the get request.");
        }
        else {
            res.send(data);
        };
    })
});