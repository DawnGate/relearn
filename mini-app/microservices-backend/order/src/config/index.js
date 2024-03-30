const config = {
  mongoOrderUri: process.env.MONGODB_ORDER_URI,
  jwtSecret: process.env.JWT_SECRET,
  rabbitMQUri: process.env.RABBIT_MQ_URI,
  productQueue: "products",
  orderQueue: "orders",
  port: 3002,
};

module.exports = config;
