const Category = require("../models/Category");

class CategoryService {
  async createCategory(data) {
    const category = new Category(data);
    return await category.save();
  }

  async listCategories() {
    return await Category.find({});
  }

  async getCategoryById(id) {
    return await Category.findById(id);
  }

  async updateCategory(id, data) {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCategory(id) {
    return await Category.findByIdAndDelete(id);
  }
}

module.exports = new CategoryService();
