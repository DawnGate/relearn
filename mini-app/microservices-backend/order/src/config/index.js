require("dotenv").config();

const config = {
  mongoOrderUri: process.env.MONGO_ORDER_URI,
  mongoAuthUri: process.env.MONGO_AUTH_URI,
  mongoProductUri: process.env.MONGO_PRODUCT_URI,
  jwtSecret: process.env.JWT_SECRET,
  port: 3002,
  rabbitMQUri: "amqp://localhost",
  rabbitMQQueue: "orders",
};

module.exports = config;
