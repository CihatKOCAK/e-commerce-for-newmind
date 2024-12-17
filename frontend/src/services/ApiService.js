import axios from 'axios';
import { API_URL, ENDPOINTS } from '../config/apiConfig';
import { AuthService } from './AuthService';

// API'yi oluşturuyoruz
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    
  },
});


// API cevaplarını işleme
const handleResponse = (response) => {
  return {
    data: response.data,
    status: response.status,
  }
}
const handleError = (error) => {
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

// /services/ApiService.js
export const userLogin = async (credentials) => {
  try {
    const response = await api.post(ENDPOINTS.USER_LOGIN, credentials);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};


// Kullanıcı Kayıt
export const userRegister = async (userData) => {
  try {
    const response = await api.post(ENDPOINTS.USER_REGISTER, userData);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};