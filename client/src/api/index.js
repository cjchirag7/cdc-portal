import axios from 'axios';
import { PROFILE_KEY } from '../store/constants';

const API = axios.create({
  baseURL: 'https://cdc-portal-believers.herokuapp.com/v1/',
  // Use http://localhost:5000/v1/ in development
  // Use https://cdc-portal-believers.herokuapp.com/ in production
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem(PROFILE_KEY)) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem(PROFILE_KEY)).tokens.access.token}`;
  }
  return req;
});

export const signIn = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const forgotPassword = (formData) => API.post('/auth/forgot-password', formData);
export const resetPassword = (formData, token) => API.post(`/auth/reset-password?token=${token}`, formData);
export const sendVerificationMail = () => API.post('/auth/send-verification-email');
export const verifyEmail = (token) => API.post(`/auth/verify-email?token=${token}`);
export const signOut = (formData) => API.post('/auth/logout', formData);
export const refreshTokens = (formData) => API.post('/auth/refresh-tokens', formData);

export const getAllUsers = (paginationOptions) => API.get(`/users`, { params: paginationOptions });
export const createUser = (formData) => API.post('/users', formData);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const editUser = (formData, id) => API.patch(`/users/${id}`, formData);

export const getAllCompanies = () => API.get('/companies');

export const getCourses = () => API.get('/courses');
export const createCourse = (course) => API.post('/courses', course);
export const editCourse = (id, course) => API.patch(`/courses/${id}`, course);
export const deleteCourse = (id) => API.delete(`/course/${id}`);

export const getBranches = () => API.get('/branches');
export const createBranch = (branch) => API.post('/branches', branch);
export const editBranch = (id, branch) => API.post(`/branches/${id}`, branch);
export const deleteBranch = (id) => API.delete(`/branches/${id}`);
