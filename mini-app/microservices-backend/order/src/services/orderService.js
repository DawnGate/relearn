const OrderRepository = require("../repositories/orderRepository");

class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(order) {
    if (!order || !order?.createdBy || !order?.totalPrice || !order?.products) {
      throw new Error("Can't create order, some fields is missing");
    }
    const newOrder = this.orderRepository.create(order);
    return newOrder;
  }

  async findOrderById(orderId) {
    if (!orderId) {
      throw new Error("request must contain orderId");
    }

    const foundOrder = this.orderRepository.findById(orderId);

    if (!foundOrder) {
      throw new Error("Order not found");
    }

    return foundOrder;
  }
}

module.exports = OrderService;
