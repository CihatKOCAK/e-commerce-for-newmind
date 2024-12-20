import axios from 'axios';
import { AuthService } from '../services/AuthService';

export const API_MAIN_URL = "http://localhost:3000/";
export const API_URL = API_MAIN_URL + "api";

export const ENDPOINTS = {
  // User Endpoints
  USER_LOGIN: "/auth/login",
  USER_REGISTER: "/auth/register",
  USER_PROFILE: "/auth/profile",
  USER_UPDATE: "/auth/:userId/profile",

  // Product Endpoints
  PRODUCTS: "/products",
  PRODUCT: "/products/:id",
  PRODUCTS_BY_CATEGORY: "/products/category/:categoryId",

  // Basket Endpoints
  BASKET_ADD: "/basket/add",
  BASKET_GET: "/basket",
  BASKET_CLEAR: "/basket/clear",
  BASKET_UPDATE: "/basket/:productId",
  BASKET_REMOVE: "/basket/:productId",

  // upload file
  UPLOAD: "/uploads/:type",

  // Campaign Endpoints
  CAMPAIGNS: "/campaigns",

  // Category Endpoints
  CATEGORIES: "/categories",

  // Admin Endpoints
  ADMINS: "/admins",

  // Payment
  PAYMENT: "/payment",
};

// API'yi oluşturuyoruz
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    
  },
});

// API cevaplarını işleme
export const handleResponse = (response) => {
  return {
    data: response.data,
    status: response.status,
  }
}
export const handleError = (error) => {
  console.error('API Error:', error);
  throw error;
};

// Axios isteği için her zaman token'ı başlığa eklemek
api.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Authorization başlığını ekle
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
