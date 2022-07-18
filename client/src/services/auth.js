import axios from "axios";
import Cookies from "js-cookie";
import config from "config.json";

/////////////////////////////// Login / Register ///////////////////////////////

const auth = (
  requestType,
  credentials,
  onSuccess,
  onError,
  onFinish,
  headers = {}
) => {
  const url = `${config.server.url}${config.server.routes[requestType]}`;
  return axios({
    method: "POST",
    url,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": "true",
      ...headers,
    },
    data: {
      email: credentials?.email,
      password: credentials?.password,
    },
  })
    .then(onSuccess)
    .catch(onError)
    .finally(onFinish);
};

export const register = (
  credentials,
  onSuccess,
  onError,
  onFinish = () => {}
) => {
  return auth("register", credentials, onSuccess, onError, onFinish);
};

export const login = (credentials, onSuccess, onError, onFinish = () => {}) => {
  return auth("login", credentials, onSuccess, onError, onFinish);
};

/////////////////////////////// Check Auth ///////////////////////////////

export const isAuth = (onSuccess, onError, onFinish = () => {}) => {
  const url = `${config.server.url}${config.server.routes.isAuth}`;
  axios({
    method: "GET",
    url,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": "true",
      ...getAuthHeader(),
    },
  })
    .then(onSuccess)
    .catch(onError)
    .finally(onFinish);

  return getCookie();
};

/////////////////////////////// Cookies ///////////////////////////////

export const setCookie = (value) => {
  const key = config.localStorage.tokenKey;
  Cookies.set(key, value);
};

export const removeCookie = () => {
  Cookies.remove(config.localStorage.tokenKey);
};

export const getCookie = () => {
  return Cookies.get(config.localStorage.tokenKey);
};

export const getAuthHeader = () => {
  return { Authorization: `Bearer ${getCookie()}` };
};
