const express = require("express");
const cors = require('cors');
const {connectDB} = require("./database/connection");

const {
    routes: recordRoutes
} = require("./routes/records");

const app = express();
app.use(cors())
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/records", recordRoutes);

const PORT = process.env.PORT || 8070;

app.get("/", (req, res) => res.send("Welcome to express case study!"))

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Running at localhost:${PORT}`);
    });
  })
  module.exports = app;