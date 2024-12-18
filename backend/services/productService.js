const Product = require("../models/Product");

class ProductService {
  async createProduct(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  async getAllProducts() {
    return await Product.find().populate("category", "name");
  }

  async getProductById(id) {
    return await Product.findById(id).populate("category", "name");
  }

  async updateProduct(id, productData) {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductService();
