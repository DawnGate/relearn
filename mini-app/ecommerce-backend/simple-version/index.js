require("dotenv").config();

const express = require("express");
const { dbConnect } = require("./config/dbConnect");

dbConnect();
const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/hello", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
