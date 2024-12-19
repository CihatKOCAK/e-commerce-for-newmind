// /config/apiConfig.js
export const API_URL = "http://localhost:3000/api";

export const ENDPOINTS = {
  // User Endpoints
  USER_LOGIN: "/auth/login",
  USER_REGISTER: "/auth/register",
  USER_PROFILE: "/auth/profile",

  // Product Endpoints
  PRODUCTS: "/products",
  PRODUCT: "/products/:id",
  PRODUCTS_BY_CATEGORY: "/products/category/:categoryId",

  // Basket Endpoints
  BASKET_ADD: "/basket/add",
  BASKET_GET: "/basket",
  BASKET_CLEAR: "/basket/clear",
  BASKET_UPDATE: "/basket/:productId",

  // Campaign Endpoints
  CAMPAIGNS: "/campaigns",

  // Category Endpoints
  CATEGORIES: "/categories",

  // Admin Endpoints
  ADMINS: "/admins",

  // Payment
  PAYMENT: "/payment",
};
