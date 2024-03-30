const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "products",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "orders",
  }
);

module.exports = mongoose.model("Order", OrderSchema);
