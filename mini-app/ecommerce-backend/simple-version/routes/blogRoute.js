const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  isAdminMiddleware,
} = require("../middlewares/authMiddleware");

const {
  createBlog,
  updateBlog,
  getOneBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  disLikeBlog,
} = require("../controller/blogCtrl");

router.post("/create", authMiddleware, isAdminMiddleware, createBlog);
router.put("/:id", authMiddleware, isAdminMiddleware, updateBlog);
router.get("/:id", getOneBlog);
router.delete("/:id", authMiddleware, isAdminMiddleware, deleteBlog);
router.get("/", getAllBlog);

router.post("/like", authMiddleware, likeBlog);
router.post("/dislike", authMiddleware, disLikeBlog);

module.exports = router;
