const express = require("express");
const cors = require("cors");
const app = express();
const catalogRouter = require("./routes/catalog");

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/catalog", catalogRouter);

app.listen(3000, () => console.log('The Dress@Home App is working...'));