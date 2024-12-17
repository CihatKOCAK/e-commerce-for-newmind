import { storage } from '../utils/localStorageUtils';

const TOKEN_KEY = 'authToken';

export const AuthService = {
  setToken: (token) => storage.setItem(TOKEN_KEY, token),
  getToken: () => storage.getItem(TOKEN_KEY),
  clearToken: () => storage.removeItem(TOKEN_KEY),
  isAuthenticated: () => !!storage.getItem(TOKEN_KEY),
};
