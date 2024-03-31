const OrderController = require("./controllers/orderController");
const express = require("express");
const mongoose = require("mongoose");

const config = require("./config");

class App {
  constructor() {
    console.log(config);

    this.app = express();
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

  async start() {
    await this.connectDB();
    this.orderController = new OrderController();
  }
}

module.exports = App;
