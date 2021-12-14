import axios from "axios";
import queryString from "query-string";

// https://github.com/axios/axios#request

const axiosClient = axios.create({
  //baseURL: process.env.REACT_APP_API_URL,
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("auth"))?.access_token;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
