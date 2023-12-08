import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

const responseBody = (response: AxiosResponse) => response.data;

/* eslint-disable */
const errorBody = (error: AxiosError) => error.response;

export const configDefaultReq: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    Accept: 'applicaiton/json',
    'Content-Type': 'application/json'
  }
};

const requester = {
  get: (url: string, params = {}, config?: AxiosRequestConfig) => {
    return axios.get(url, { params, ...configDefaultReq, ...config }).then(responseBody);
  },
  post: (url: string, data = {}, config?: AxiosRequestConfig) => {
    return axios.post(url, data, { ...configDefaultReq, ...config }).then(responseBody);
  },
  put: (url: string, data = {}, config?: AxiosRequestConfig) => {
    return axios.put(url, data, { ...configDefaultReq, ...config }).then(responseBody);
  },
  delete: (url: string, params = {}, config?: AxiosRequestConfig) => {
    return axios.delete(url, { params, ...config, ...configDefaultReq }).then(responseBody);
  }
};

export default requester;
