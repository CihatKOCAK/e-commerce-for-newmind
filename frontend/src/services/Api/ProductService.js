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
}


