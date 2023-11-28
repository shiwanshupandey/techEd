import axios from 'axios';

// Create an instance of axios with default configuration
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Add an interceptor to attach the authentication token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default api;
