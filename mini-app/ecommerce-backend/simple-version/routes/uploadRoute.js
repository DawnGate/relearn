const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  isAdminMiddleware,
} = require("../middlewares/authMiddleware");

const { uploadImages, deleteImage } = require("../controller/uploadCtrl");

const {
  uploadPhoto,
  productImageResize,
} = require("../middlewares/uploadImage");

router.post(
  "/",
  authMiddleware,
  isAdminMiddleware,
  uploadPhoto.array("images", 10),
  productImageResize,
  uploadImages
);

router.delete(
  "/delete-img/:id",
  authMiddleware,
  isAdminMiddleware,
  deleteImage
);

module.exports = router;
