const MessageBroker = require("../utils/messageBroker");
const config = require("../config");
const ProductService = require("../services/productService");
const uuid = require("uuid");

class ProductController {
  constructor() {
    this.productService = new ProductService();
    this.ordersMap = new Map();

    this.messageBroker = new MessageBroker();
    this.messageBroker.connect(config.productQueue, config.rabbitMqUri);
  }

  async createProduct(req, res) {
    const body = req.body;

    try {
      const product = await this.productService.createProduct(body);
      res.status(201).json({
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  }

  async getProducts(req, res) {
    const products = await this.productService.findAllProduct();
    res.status(200).json({
      body: products,
    });
  }

  async createOrder(req, res) {
    try {
      const { ids } = req.body;

      const products = await this.productService.findProductByFilter({
        _id: {
          $in: ids,
        },
      });

      const orderId = uuid.v4();
      const newOrder = {
        status: "pending",
        products,
        username: req.user.username,
        orderId,
      };
      this.ordersMap.set(orderId, newOrder);

      this.messageBroker.publishMessage(config.productQueue, newOrder);

      this.messageBroker.consumeMessage(config.orderQueue, (updateOrder) => {
        const { orderId } = updateOrder;

        const olderInController = this.ordersMap.get(orderId);
        if (olderInController) {
          this.ordersMap.set(orderId, {
            ...updateOrder,
            status: "completed",
          });
        }
      });

      let updateOrder = this.ordersMap.get(orderId);
      while (updateOrder.status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 100));
        updateOrder = this.ordersMap.get(orderId);
      }

      this.ordersMap.delete(orderId);

      res.status(201).json({
        body: {
          order: updateOrder,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: `Server error ${err.message}`,
      });
    }
  }

  async getOrderStatus(req, res) {
    const { orderId } = req.params;

    const order = this.ordersMap.get(orderId);

    if (!order) {
      res.status(400).json({
        message: "Order not found",
      });
    }

    return res.status(200).json(order);
  }
}

module.exports = ProductController;
