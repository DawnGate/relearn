const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 100000,
  },
});

const productImageResize = async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  await Promise.all(
    req.files.map(async (file) => {
      const newPath = `${file.destination}/products/${file.filename}`;
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(newPath);
      fs.unlinkSync(file.path);
    })
  );

  next();
};
const blogImageResize = async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/blogs/${file.filename}`);

      fs.unlinkSync(`public/images/blogs/${file.filename}`);
    })
  );

  next();
};

module.exports = {
  uploadPhoto,
  productImageResize,
  blogImageResize,
};
