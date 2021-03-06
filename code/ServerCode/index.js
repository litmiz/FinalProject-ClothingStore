const express = require("express");
const cors = require("cors");
const app = express();
const catalogRouter = require("./routes/catalog");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");
const ratingsRouter = require("./routes/ratings");
const sendQueryRouter = require("./routes/sendQuery");

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/catalog", catalogRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/ratings", ratingsRouter);
app.use("/sendQuery", sendQueryRouter);
app.use(express.static('public'));

app.listen(3000, () => console.log("The Dress@Home App is working..."));