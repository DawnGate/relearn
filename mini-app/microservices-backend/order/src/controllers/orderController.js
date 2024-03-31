const MessageBroker = require("../utils/messageBroker");
const config = require("../config");
const OrderService = require("../services/orderService");

class OrderController {
  constructor() {
    this.orderService = new OrderService();

    this.messageBroker = new MessageBroker();
    this.messageBroker
      .connect(config.orderQueue, config.rabbitMQUri)
      .then((res) => {
        console.log("success connect");
        this.subscribeChannel();
      });
  }

  subscribeChannel() {
    this.messageBroker.consumeMessage(config.productQueue, async (newOrder) => {
      console.log("Receive new order", newOrder);
      try {
        const order = await this.orderService.createOrder(newOrder);
        console.log("Send back order", newOrder);
        this.messageBroker.publishMessage(config.orderQueue, order);
      } catch (err) {
        console.error(err);
        this.messageBroker.channel.reject(message, false);
      }
    });
  }
}

module.exports = OrderController;
