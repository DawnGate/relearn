const Product = require("../model/productModel");

const asyncHandler = require("express-async-handler");

const slugify = require("slugify");
const { validateMongDbbId } = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { title, description, category, price, brand, quantity } = req.body;

    const slug = slugify(title);

    const newProduct = await Product.create({
      title,
      description,
      price,
      brand,
      quantity,
      category,
      slug,
    });

    res.json(newProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongDbbId(id);

    const { title, description, category, price, brand, quantity } = req.body;

    const slug = slugify(title);

    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...(title && {
          title,
          slug,
        }),
        ...(description && {
          description,
        }),
        ...(category && {
          category,
        }),
        ...(price && {
          price,
        }),
        ...(brand && {
          brand,
        }),
        ...(quantity && {
          quantity,
        }),
      },
      {
        new: true,
      }
    );
    res.json(updateProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongDbbId(id);

    const deleteProduct = await Product.findByIdAndDelete(id);

    res.json(deleteProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const getOneProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongDbbId(id);

    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json(foundProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let queryProduct = Product.find(JSON.parse(queryStr));

    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryProduct = queryProduct.sort(sortBy);
    } else {
      queryProduct = queryProduct.sort("-createdAt");
    }

    // limit the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queryProduct = queryProduct.select(fields);
    } else {
      queryProduct = queryProduct.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;

    queryProduct = queryProduct.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new Error("This page does not exists");
      }
    }
    const products = await queryProduct;

    res.json(products);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  getAllProduct,
};
