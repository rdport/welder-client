import axios from '../config/axiosinstance';
import { loginPage } from '../config/redirect';

let authToken;
let adminClass;
let fullName;
let isAuthenticated;
let utilPath

export function login({ accessToken, adminClassName, adminFullName }) {
  authToken = accessToken;
  adminClass = adminClassName;
  fullName = adminFullName;
  isAuthenticated = true;
  window.addEventListener('storage', syncLogout);
}

export function getToken() {
  return authToken;
}

export function getClass() {
  return adminClass;
}

export function getAdminFullName() {
  return fullName;
}

export function getIsAuthenticated() {
  return isAuthenticated;
}

export function setUtilPath(value) {
  utilPath = value;
}

export function getUtilPath() {
  return utilPath;
}

export async function auth() {
  try {
    const { data } = await axios.post('/admins/refresh-token', {});
    const accessToken = data.accessToken;
    const adminClassName = data.class;
    const adminFullName = data.fullName;
    login({ accessToken, adminClassName, adminFullName });
    return Promise.resolve(isAuthenticated);
  } catch (err) {
    isAuthenticated = false;
    return Promise.reject(err);
  }
}

export async function logout() {
  try {
    const access_token = getToken();
    const { data } = await axios.post('/admins/logout', {},
      {
        headers: { access_token }
      });
    window.localStorage.setItem('logout', Date.now());
    logoutAndRedirect();
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function logoutAll() {
  try {
    const access_token = getToken();
    const { data } = await axios.post('/admins/logout-all', {},
      {
        headers: { access_token }
      });
    window.localStorage.setItem('logout', Date.now());
    logoutAndRedirect();
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
}

function syncLogout(event) {
  if (event.key === 'logout') {
    window.location.href = loginPage;
    console.log('user logged out on another tab\nlogged out on all tabs');
  }
}

function logoutAndRedirect() {
  isAuthenticated = false;
  authToken = null;
  adminClass = null;
  window.removeEventListener('storage', syncLogout);
  // window.localStorage.removeItem('logout');
}
