const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  isAdminMiddleware,
} = require("../middlewares/authMiddleware");

const {
  createProduct,
  getOneProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  rating,
  addToWishList,
} = require("../controller/productCtrl");

router.post("/create", authMiddleware, isAdminMiddleware, createProduct);

router.put("/:id", authMiddleware, isAdminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, isAdminMiddleware, deleteProduct);

router.get("/:id", getOneProduct);
router.get("/", getAllProduct);

router.post("/rating", authMiddleware, rating);
router.post("/wishlist", authMiddleware, addToWishList);

module.exports = router;
