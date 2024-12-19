import { api, handleError, handleResponse, ENDPOINTS } from "../../config/apiConfig";
export default class APIService_Basket {
  static async getBasket() {
    try {
      const response = await api.get(ENDPOINTS.PRODUCTS);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  static async addProductToBasket(product) {
    try {
      const response = await api.post(ENDPOINTS.BASKET_ADD, product);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  static async clearBasket() {
    try {
      const response = await api.delete(ENDPOINTS.BASKET_CLEAR);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  static async updateBasket(product) {
    try {
      const response = await api.put(
        ENDPOINTS.BASKET_UPDATE.replace(":productId", product.id),
        product
      );
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }
}
