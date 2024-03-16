const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  isAdminMiddleware,
} = require("../middlewares/authMiddleware");

const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} = require("../controller/blogCategoryCtrl");

router.post("/create", authMiddleware, isAdminMiddleware, createCategory);
router.put("/:id", authMiddleware, isAdminMiddleware, updateCategory);
router.delete("/:id", authMiddleware, isAdminMiddleware, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategory);

module.exports = router;
