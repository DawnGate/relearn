const OrderController = require("./controllers/orderController");
const express = require("express");
const mongoose = require("mongoose");

const config = require("./config");

class App {
  constructor() {
    this.app = express();
    this.connectDB();
    this.orderController = null;
  }

  async connectDB() {
    await mongoose.connect(config.mongoOrderUri);
    console.log("connected db");
  }

  async disconnectDB() {
    await mongoose.disconnect();
    console.log("disconnected db");
  }

  start() {
    this.orderController = new OrderController();
  }
}

module.exports = App;
