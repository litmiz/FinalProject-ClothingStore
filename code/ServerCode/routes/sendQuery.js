require('dotenv').config()
const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'sendQuery/'});
const nodeMailer = require("../modules/nodeMailer");
const queryTypes = ["no type", "suggestion", "complaint", "idea", "Looking for a job"]

router.post("/", upload.single('cv'), (req, res) => {
    const q = JSON.parse(req.body.query);
    nodeMailer.sendMail(process.env.EMAIL, `${queryTypes[q.queryType]} - from ${q.fullName}`, `${q.queryContent}\n\n Customer email - ${q.email}`, req.file);
    res.end();
});

module.exports = router;