const express = require("express");

class App {
  constructor() {
    this.app = express();
  }

  start() {
    this.server = this.app.listen(3000, () => {
      console.log("server start on port 3000");
    });
  }
}
