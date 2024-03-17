const Product = require("../model/productModel");
const User = require("../model/userModel");

const fs = require("fs");

const asyncHandler = require("express-async-handler");
const {
  cloudinaryUploadImage,
  cloudinaryDeleteImage,
} = require("../utils/cloudinary");

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImage(path);
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const path = file.path;
      //   const newpath = await uploader(path);
      const newpath = "image_path_temp";
      urls.push(newpath);
      // remove the file in current path
      fs.unlinkSync(path);
    }
    res.json(files);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteImage = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    cloudinaryDeleteImage(id);
    res.json({
      message: "Deleted",
    });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  uploadImages,
  deleteImage,
};
