import axios from "axios";
import config from "config.json";

const fetchAllProducts = (filter, onSuccess, onError) => {
  const baseUrl = `${config.server.url}${config.server.routes.getAllProducts}`;
  const skip = config.query.products[filter].skip;
  const limit = config.query.products[filter].limit;
  const sortBy = config.query.products[filter].sortBy;
  const order = config.query.products[filter].order;

  const url = `${baseUrl}?skip=${skip}&limit=${limit}&sortBy=${sortBy}&order=${order}`;
  return axios.get(url).then(onSuccess).catch(onError);
};

export const fetchProductsBySold = (onSuccess, onError) => {
  return fetchAllProducts("bySold", onSuccess, onError);
};

export const fetchProductsByDate = (onSuccess, onError) => {
  return fetchAllProducts("byDate", onSuccess, onError);
};
