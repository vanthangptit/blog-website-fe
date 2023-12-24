import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { LOGIN, REFRESH_TOKEN } from '@constants/apis';

const setConf = ({ isCredentials= false, token }: { isCredentials?: boolean; token?: string }): AxiosRequestConfig => {
  return {
    withCredentials: isCredentials, // Only true when get token or login
    headers: {
      Accept: 'applicaiton/json',
      'Content-Type': 'application/json',
      Authorization: token ? 'Bearer ' + token : null
    }
  };
};

const verifyCredentials = (url: string) => url === REFRESH_TOKEN.URL_API || url === LOGIN.URL_API;

const responseBody = (response: AxiosResponse) => response.data;
const errorBody = (error: AxiosError) => error.response?.data ? error.response.data : error.response;

const getToken = () => axios.get(REFRESH_TOKEN.URL_API, setConf({ isCredentials: true }));

const get = (url: string, params = {}, config: AxiosRequestConfig) => axios.get(url, { params, ...config });
const post = (url: string, data = {}, config: AxiosRequestConfig) => axios.post(url, data, { ...config });
const put = (url: string, data = {}, config: AxiosRequestConfig) => axios.put(url, data, { ...config });
const del = (url: string, params = {}, config: AxiosRequestConfig) => axios.delete(url, { params, ...config });

const requester = {
  get: (url: string, params = {}, token?: string) => {
    return get(url, params, setConf({ token, isCredentials: verifyCredentials(url) }))
      .then(responseBody)
      .catch((error: AxiosError) => {
        if (error.response?.status !==  401) {
          return errorBody(error);
        }

        return getToken()
          .then((rs: AxiosResponse) => get(url, params, setConf({
            token: rs.data.accessToken,
            isCredentials: verifyCredentials(url)
          })).then(responseBody).catch(errorBody))
          .catch(errorBody);
      });
  },
  post: (url: string, data = {}, token?: string) => {
    return post(url, data, setConf({ token, isCredentials: verifyCredentials(url) }))
      .then(responseBody)
      .catch((error: AxiosError) => {
        if (error.response?.status !==  401) {
          return errorBody(error);
        }

        return getToken()
          .then((rs: AxiosResponse) => post(url, data, setConf({
            token: rs.data.accessToken,
            isCredentials: verifyCredentials(url)
          })).then(responseBody).catch(errorBody))
          .catch(errorBody);
      });
  },
  put: (url: string, data = {}, token?: string) => {
    put(url, data, setConf({ token, isCredentials: verifyCredentials(url) }))
      .then(responseBody)
      .catch((error: AxiosError) => {
        if (error.response?.status !==  401) {
          return errorBody(error);
        }

        return getToken()
          .then((rs: AxiosResponse) => put(url, data, setConf({
            token: rs.data.accessToken,
            isCredentials: verifyCredentials(url)
          })).then(responseBody).catch(errorBody))
          .catch(errorBody);
      });
  },
  delete: (url: string, params = {}, token?: string) => {
    del(url, params, setConf({ token, isCredentials: verifyCredentials(url) }))
      .then(responseBody)
      .catch((error: AxiosError) => {
        if (error.response?.status !==  401) {
          return errorBody(error);
        }

        return getToken()
          .then((rs: AxiosResponse) => del(url, params, setConf({
            token: rs.data.accessToken,
            isCredentials: verifyCredentials(url)
          })).then(responseBody).catch(errorBody))
          .catch(errorBody);
      });
  }
};

export default requester;
