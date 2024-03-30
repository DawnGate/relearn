const express = require("express");
const mongoose = require("mongoose");

const config = require("./config");

const authMiddleware = require("./middleware/authMiddleware");
const AuthController = require("./controller/authController");

class App {
  constructor() {
    this.app = express();
    this.authController = new AuthController();

    this.connectDB();
    this.setMiddleware();
    this.setRouters();
  }

  async connectDB() {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB connect");
  }

  async disconnectDB() {
    await mongoose.disconnect(config.mongoUri);
    console.log("MongoDB disconnected");
  }

  setMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  setRouters() {
    this.app.post("/login", (req, res) => this.authController.login(req, res));
    this.app.post("/register", (req, res) =>
      this.authController.register(req, res)
    );
    this.app.get("/dashboard", authMiddleware, (req, res) =>
      res.json({ message: "Welcome to dashboard" })
    );
  }

  start() {
    this.server = this.app.listen(config.port, () => {
      console.log(`server start on port ${config.port} `);
    });
  }

  async stop() {
    this.disconnectDB();
    this.server.close();
    console.log("Server stopped");
  }
}

module.exports = App;
