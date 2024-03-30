const express = require("express");

const ProductController = require("../controllers/productController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
const productController = new ProductController();

router.get("/", authMiddleware, (req, res) =>
  productController.getProducts(req, res)
);
router.post("/", authMiddleware, (req, res) =>
  productController.createProduct(req, res)
);
router.post("/buy", authMiddleware, (req, res) =>
  productController.createOrder(req, res)
);

router.get("/order-status", authMiddleware, (req, res) =>
  productController.getOrderStatus(req, res)
);

module.exports = router;
