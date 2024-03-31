const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const config = {
  mongoOrderUri: process.env.MONGO_ORDER_URI,
  jwtSecret: process.env.JWT_SECRET,
  rabbitMQUri: process.env.RABBIT_MQ_URI,
  productQueue: "products",
  orderQueue: "orders",
  port: 3002,
};

module.exports = config;
