import axios from 'axios';
import { useContext } from 'react';
import { useAppContext } from './context/AppContext';
import { logout } from './auth';
import Toast from './components/Toast';
import { t } from 'i18next';
import { message } from 'antd';

// Create an Axios instance
const axiosInstance = axios.create({
  // other configurations if needed
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response, // If the response is successful, just return it
  error => {
    // If the response has an error status code
    console.log(error);
    if (error.response && error.response.status === 401 && error.response.data.message === 'invalid token') {
      // Call the logout function
      // message.info( !window.location.pathname.includes('signup') ? t('Log in for a new session') : t('Sign up for a new session'));
      setTimeout(() => {
        logout();
      }, []);
    } else if(error.response && error.response.data.message === 'email not verified'){
      message.warning(t('Email not verified'));
      setTimeout(() => {
        logout();
      }, [2000]);
    }
    // Return the error to be handled by the calling function
    return Promise.reject(error);
  }
);

export default axiosInstance;