import { api, handleError, handleResponse, ENDPOINTS } from "../../config/apiConfig";
export default class APIService_Basket {
  static async getBasket() {
    try {
      const response = await api.get(ENDPOINTS.BASKET_GET);
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  static async addItemToBasket(productId, quantity) {
    try {
      const response = await api.post(ENDPOINTS.BASKET_ADD, { productId, quantity });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  static async createBasket(items) {
    try {
      const response = await api.post(ENDPOINTS.BASKET_CREATE, { items });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  static async updateQuantity(productId, quantity) {
    try {
      const response = await api.put(ENDPOINTS.BASKET_UPDATE.replace(":productId", productId), { quantity });
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
        ENDPOINTS.BASKET_UPDATE.replace(":productId", product._id),
        product
      );
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }

  static async removeFromBasket(productId) {
    try {
      const response = await api.delete(ENDPOINTS.BASKET_REMOVE.replace(":productId", productId));
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  }
}
