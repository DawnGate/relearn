const Order = require("../models/order");

class OrderRepository {
  async create(order) {
    const newOrder = await Order.create(order);
    return newOrder;
  }

  async findById(orderId) {
    const foundOrder = await Order.findById(orderId);
    return foundOrder;
  }
}

module.exports = OrderRepository;
