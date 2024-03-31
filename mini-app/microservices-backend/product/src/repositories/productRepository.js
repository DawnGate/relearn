const Product = require("../models/product");

class ProductRepository {
  async create(product) {
    const newProduct = await Product.create(product);
    return newProduct;
  }

  async findById(productId) {
    const foundProduct = await Product.findById(productId);
    return foundProduct;
  }

  async findByName(productName) {
    const foundProduct = await Product.findOne({
      name: productName,
    });

    return foundProduct;
  }

  async findAll() {
    const products = await Product.find();
    return products;
  }

  async findWithFilter(filter) {
    const products = await Product.find(filter);
    return products;
  }

  async deleteTestProducts() {
    await Product.deleteMany({
      name: /^test/,
    });
  }
}

module.exports = ProductRepository;
