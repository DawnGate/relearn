const amqp = require("amqplib");

class MessageBroker {
  constructor() {
    this.channel = null;
  }

  async connect(exchangeQueue, rabbitMqUri) {
    console.log("Connecting RabbitMQ");
    const waitConnectWithRabbitMQ = new Promise((resolve) =>
      setTimeout(async () => {
        try {
          const connection = await amqp.connect(rabbitMqUri);
          this.channel = await connection.createChannel();
          await this.channel.assertQueue(exchangeQueue);
          resolve();
          console.log("RabbitMQ connected");
        } catch (err) {
          throw new Error("Connect error, rabbitMQ", err.message);
        }
      }, 10000)
    );
    await waitConnectWithRabbitMQ;
  }

  publishMessage(queue, message) {
    if (!this.channel) {
      throw new Error("No rabbitmq available");
    }

    try {
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async consumeMessage(queue, callback) {
    if (!this.channel) {
      throw new Error("No rabbitmq available");
    }

    try {
      await this.channel.consume(queue, (message) => {
        const content = message.content.toString();
        const parsedContent = JSON.parse(content);
        callback(parsedContent);
        this.channel.ack(message);
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = MessageBroker;
