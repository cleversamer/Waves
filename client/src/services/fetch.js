import axios from "axios";
import config from "config.json";

// General purposes
const fetchAllProducts = (filter, onSuccess, onError) => {
  const baseUrl = `${config.server.url}${config.server.routes.getAllProducts}`;
  const skip = config.query.products[filter].skip;
  const limit = config.query.products[filter].limit;
  const sortBy = config.query.products[filter].sortBy;
  const order = config.query.products[filter].order;

  const url = `${baseUrl}?skip=${skip}&limit=${limit}&sortBy=${sortBy}&order=${order}`;
  return axios.get(url).then(onSuccess).catch(onError);
};

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

// Specific purposes
export const fetchProductsBySold = (onSuccess, onError) => {
  return fetchAllProducts("bySold", onSuccess, onError);
};

export const fetchProductsByDate = (onSuccess, onError) => {
  return fetchAllProducts("byDate", onSuccess, onError);
};

export const register = (credentials, onSuccess, onError, onFinish) => {
  return auth("register", credentials, onSuccess, onError, onFinish);
};

export const login = (credentials, onSuccess, onError, onFinish) => {
  return auth("login", credentials, onSuccess, onError, onFinish);
};
