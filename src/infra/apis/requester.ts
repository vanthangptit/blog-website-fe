import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

const responseBody = (response: AxiosResponse) => response.data;

/* eslint-disable */
const errorBody = (error: AxiosError) => error.response;

const requester = {
  get: (url: string, params = {}, config?: AxiosRequestConfig) => {
    return axios.get(url, { params, ...config }).then(responseBody);
  },
  post: (url: string, data = {}, config?: AxiosRequestConfig) => {
    return axios.post(url, data, { ...config }).then(responseBody);
  },
  put: (url: string, data = {}, config?: AxiosRequestConfig) => {
    return axios.put(url, data, { ...config }).then(responseBody);
  },
  delete: (url: string, params = {}, config?: AxiosRequestConfig) => {
    return axios.delete(url, { params, ...config }).then(responseBody);
  }
};

export default requester;
