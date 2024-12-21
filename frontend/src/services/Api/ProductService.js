import { api, handleError, handleResponse, ENDPOINTS } from "../../config/apiConfig";
export default class APIService_Product {
  static async getProducts() {
    try {
      const response = await api.get(ENDPOINTS.PRODUCTS);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  static async getProductById(id) {
    try {
      const response = await api.get(ENDPOINTS.PRODUCT.replace(':id', id));
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  };

  static async getProductsByCategory(categoryId) {
    try {
      const response = await api.get(ENDPOINTS.PRODUCTS_BY_CATEGORY.replace(':categoryId', categoryId));
      return handleResponse(response);
    }
    catch (error) {
      handleError(error);
    }
  }

  static async addProduct(productData) {
    try {
      const response = await api.post(ENDPOINTS.PRODUCTS, productData);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  static async getCategories() {
    try {
      const response = await api.get(ENDPOINTS.CATEGORIES);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  static async updateCategory(categoryId, categoryData) {
    try {
      const response = await api.put(ENDPOINTS.CATEGORIES + '/' + categoryId, categoryData);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  static async addCategory(categoryData) {
    try {
      const response = await api.post(ENDPOINTS.CATEGORIES, categoryData);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  static async deleteCategory(categoryId) {
    try {
      const response = await api.delete(ENDPOINTS.CATEGORIES + '/' + categoryId);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }
}


