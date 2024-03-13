const express = require("express");

const {
  createUser,
  loginUser,
  getAUser,
  getAllUser,
  deleteAUser,
  updateUser,
  blockUser,
  unBlockUser,
} = require("../controller/userCtrl");

const {
  authMiddleware,
  isAdminMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);

router.get("/all-user", getAllUser);
router.get("/:id", authMiddleware, isAdminMiddleware, getAUser);
router.delete("/:id", authMiddleware, isAdminMiddleware, deleteAUser);
router.put("/:id", authMiddleware, updateUser);

router.put("/block-user/:id", authMiddleware, isAdminMiddleware, blockUser);
router.put(
  "/un-block-user/:id",
  authMiddleware,
  isAdminMiddleware,
  unBlockUser
);

module.exports = router;
