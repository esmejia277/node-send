import axiosClient from './axios';

const tokenAuth = token => {
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Beater ${token}`;
  } else {
    delete axiosClient.defaults.headers.common['Authorization'];
  }
}

export default tokenAuth;