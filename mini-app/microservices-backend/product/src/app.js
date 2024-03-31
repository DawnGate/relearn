const express = require("express");
const mongoose = require("mongoose");

const config = require("./config");

const productRouter = require("./routers/productRouter");

class App {
  constructor() {
    console.log(config);
    this.app = express();
    this.setMiddlewares();
    this.setRoutes();
  }

  async connectDb() {
    await mongoose.connect(config.mongoProductUri);
    console.log("connected DB");
  }

  async disconnectDB() {
    await mongoose.disconnect();
    console.log("disconnected DB");
  }

  setMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  setRoutes() {
    this.app.use("/api/product", productRouter);
  }

  async start() {
    await this.connectDb();
    this.server = this.app.listen(config.port, () => {
      console.log(`This app listen on port ${config.port}`);
    });
  }

  async stop() {
    await this.disconnectDB();
    this.server.close();
    console.log("This app stop");
  }
}

module.exports = App;
