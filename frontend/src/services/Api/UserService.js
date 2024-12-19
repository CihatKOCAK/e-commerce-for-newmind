import { api, handleError, handleResponse, ENDPOINTS } from "../../config/apiConfig";
export default class APIService_User {
    static async userLogin(credentials) {
      try {
        const response = await api.post(ENDPOINTS.USER_LOGIN, credentials);
        return handleResponse(response);
      } catch (error) {
        handleError(error);
      }
    };
    
    static async userRegister(userData) {
      try {
        const response = await api.post(ENDPOINTS.USER_REGISTER, userData);
        return handleResponse(response);
      } catch (error) {
        handleError(error);
      }
    };
    
    static async getUserProfile() {
      try {
        const response = await api.get(ENDPOINTS.USER_PROFILE);
        return handleResponse(response);
      } catch (error) {
        handleError(error);
      }
    };
  }