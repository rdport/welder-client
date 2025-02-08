import axios from 'axios';
import { getToken, getUtilPath } from '../utils/auth';
import { loginPage } from './redirect';
import { auth } from '../utils/auth';
const baseURL = 'https://welder-server-rdport.onrender.com';

const instance = axios.create({
  // baseURL: 'https://e-commerce-cms-rud.herokuapp.com'
  baseURL,
  withCredentials: true
});


// instance.interceptors.request.use(req => {
//   if (axios.defaults.headers.access_token) return req;
//   throw ({ message:"the token is not available" });
//  }, error => {
//   return Promise.reject(error);
//  }
// );
if (!window.localStorage.getItem('logout')) {
  instance.interceptors.response.use(response => response, error => {
    const originalRequest = error.config;
    let retry = localStorage.getItem('retry');
    console.log(originalRequest, 'originalRequest');
    console.log(error.response, "<<<<<,");
    console.log(retry, "<<<<<1,");
    if(error.response) {
      if (error.response.status === 401 && originalRequest.url === '/admins/refresh-token' && !retry) {
        if (getUtilPath() !== '/login') window.location.href = loginPage;
        window.localStorage.setItem('retry', true);
        return Promise.reject(error);
      } else {
        window.localStorage.removeItem('retry');
        retry = window.localStorage.getItem('retry');
        if (error.response.status === 401 && originalRequest.url !== '/admins/login' && originalRequest.url !== '/admins/refresh-token'  && !retry) {
          console.log(retry, "<<<<<2,");
          return auth()
            .then(res => {
              console.log(res, '<<<<<authRetry')
              console.log('insideaxios');
              originalRequest.headers.access_token = getToken();
              console.log(originalRequest, 'replaceAT');
              return axios(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            })
        }
      }
    }
    console.log('error-last')
    return Promise.reject(error);
  });
}

if (window.localStorage.getItem('logout')) window.localStorage.removeItem('logout');

export default instance;
