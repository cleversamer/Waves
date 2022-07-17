import axios from "axios";
import cookie from "react-cookies";
import config from "config.json";

const auth = (requestType, credentials, onSuccess, onError, onFinish) => {
  const url = `${config.server.url}${config.server.routes[requestType]}`;
  return axios({
    method: "POST",
    url,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    data: {
      email: credentials.email,
      password: credentials.password,
    },
  })
    .then(onSuccess)
    .catch(onError)
    .finally(onFinish);
};

export const register = (credentials, onSuccess, onError, onFinish) => {
  return auth("register", credentials, onSuccess, onError, onFinish);
};

export const login = (credentials, onSuccess, onError, onFinish) => {
  return auth("login", credentials, onSuccess, onError, onFinish);
};

export const getTokenCookie = () => cookie.load("x-access-token");

export const removeTokenCookie = () =>
  cookie.remove("x-access-token", { path: "/" });

export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getTokenCookie()}` } };
};
