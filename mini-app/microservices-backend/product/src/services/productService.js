const ProductRepository = require("../repositories/productRepository");

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(product) {
    const foundProduct = await this.productRepository.findByName(product?.name);

    if (foundProduct) {
      throw new Error("Already exist this product name");
    }

    const newProduct = await this.productRepository.create(product);
    return newProduct;
  }

  async findProductById(productId) {
    const foundProduct = await this.productRepository.findById(productId);
    return foundProduct;
  }

  async findAllProduct() {
    const products = await this.productRepository.findAll();
    return products;
  }

  async findProductByFilter(filter) {
    const products = await this.productRepository.findWithFilter(filter);
    return products;
  }
}

module.exports = ProductService;
