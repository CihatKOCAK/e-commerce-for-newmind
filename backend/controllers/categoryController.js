const categoryService = require("../services/categoryService");
const redisClient = require('../config/redis');
// Cache süresi (TTL - Time To Live) bir gün (86400 saniye)
const cacheTTL = 86400 * 360; // 30 gün

class CategoryController {
  async create(req, res) {
    try {
      const category = await categoryService.createCategory(req.body);

      // Yeni kategori oluşturulduğunda cache'i temizle
      await redisClient.del('categories'); // Tüm kategorilerin cache'ini temizle
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async list(req, res) {
    try {
      // Redis'te kategoriler var mı kontrol et
      const cachedCategories = await redisClient.get('categories');

      if (cachedCategories) {
        // Redis'ten veri döndür
        console.log('Cache hit: categories');
        return res.status(200).json(JSON.parse(cachedCategories));
      }

      // Redis'te yoksa, veritabanından al
      const categories = await categoryService.listCategories();

      //  Veritabanından alınan veriyi Redis'e kaydet
      await redisClient.setEx('categories', cacheTTL, JSON.stringify(categories));

      console.log('Cache miss: categories');
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async get(req, res) {
    try {
      const categoryId = req.params.id;

      // Redis'te bu kategori var mı kontrol et
      const cachedCategory = await redisClient.get(`category:${categoryId}`);

      if (cachedCategory) {
        // Redis'ten veri döndür
        console.log(`Cache hit: category:${categoryId}`);
        return res.status(200).json(JSON.parse(cachedCategory));
      }

      // Redis'te yoksa, veritabanından al
      const category = await categoryService.getCategoryById(categoryId);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Veritabanından alınan veriyi Redis'e kaydet
      await redisClient.setEx(`category:${categoryId}`, cacheTTL, JSON.stringify(category));

      console.log(`Cache miss: category:${categoryId}`);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await categoryService.updateCategory(categoryId, req.body);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Güncellemeden sonra ilgili cache'i temizle
      await redisClient.del(`category:${categoryId}`);
      await redisClient.del('categories'); // Tüm kategorilerin cache'ini temizle

      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await categoryService.deleteCategory(categoryId);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Silme işleminden sonra ilgili cache'i temizle
      await redisClient.del(`category:${categoryId}`);
      await redisClient.del('categories'); // Tüm kategorilerin cache'ini temizle

      res.status(200).json({ message: "Category deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CategoryController();
