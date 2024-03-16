const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  isAdminMiddleware,
} = require("../middlewares/authMiddleware");

const {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupon,
  getAllCoupon,
} = require("../controller/couponCtrl");

router.post("/create", authMiddleware, isAdminMiddleware, createCoupon);
router.put("/:id", authMiddleware, isAdminMiddleware, updateCoupon);
router.delete("/:id", authMiddleware, isAdminMiddleware, deleteCoupon);
router.get("/:id", authMiddleware, isAdminMiddleware, getCoupon);
router.get("/", authMiddleware, isAdminMiddleware, getAllCoupon);

module.exports = router;
