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
} = require("../controller/productCtrl");

router.post("/create", authMiddleware, isAdminMiddleware, createProduct);

router.put("/:id", authMiddleware, isAdminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, isAdminMiddleware, deleteProduct);

router.get("/:id", getOneProduct);
router.get("/", getAllProduct);

module.exports = router;
