import axios from '../utils/axios.js';

export const login = async ({ email, password }) => {
  const response = await axios.post('/auth/login', { email, password });
  if (response.data?.token) {
    return response.data;
  }
  throw new Error('Invalid response from server');
};

export const register = async (userData) => {
  const response = await axios.post('/auth/register', userData);
  if (response.data?.token) {
    return response.data;
  }
  throw new Error('Registration failed');
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return JSON.parse(user);
  }
  return null;
};
