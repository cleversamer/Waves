import axios from "axios";
import query from "utils/query";
import config from "config.json";

// General purposes
const fetchAllProducts = (typeKey, queryParams, onSuccess, onError) => {
  const baseUrl = `${config.server.url}${config.server.routes.getAllProducts}`;
  const queryString = query(queryParams || config.query.products[typeKey]);
  const url = `${baseUrl}?${queryString}`;
  return axios.get(url).then(onSuccess).catch(onError);
};

// Specific purposes
export const fetchProductsBySold = (onSuccess, onError) => {
  return fetchAllProducts("bySold", null, onSuccess, onError);
};

export const fetchProductsByDate = (onSuccess, onError) => {
  return fetchAllProducts("byDate", null, onSuccess, onError);
};

export const fetchPaginatedProducts = (pagination, onSuccess, onError) => {
  return fetchAllProducts(null, pagination, onSuccess, onError);
};

export const fetchAllBrands = (onSuccess, onError) => {
  const url = `${config.server.url}${config.server.routes.getAllBrands}`;
  return axios.get(url).then(onSuccess).catch(onError);
};
