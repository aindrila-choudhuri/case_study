const express = require("express");
const cors = require('cors');

const {
    routes: recordRoutes
} = require("./routes/records");

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/records", recordRoutes);

//Home route
app.get("/", (req, res) => res.send("Welcome to express case study!"))

module.exports = app;