const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  getAUser,
  getAllUser,
  deleteAUser,
  updateUser,
  blockUser,
  unBlockUser,
  refreshNewToken,
  logout,
  updatePassword,
} = require("../controller/userCtrl");

const {
  authMiddleware,
  isAdminMiddleware,
  isYouMiddleware,
} = require("../middlewares/authMiddleware");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", authMiddleware, logout);

router.put("/password", authMiddleware, updatePassword);

router.get("/refresh", authMiddleware, refreshNewToken);

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
