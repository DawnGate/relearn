const config = {
  mongoProductUri: process.env.MONGO_PRODUCT_URI,
  jwtSecret: process.env.JWT_SECRET,
  rabbitMqUri: process.env.RABBIT_MQ_URI,
  productQueue: "products",
  orderQueue: "orders",
  port: 3001,
};

module.exports = config;
