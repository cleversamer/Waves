import axios from "axios";
import config from "config.json";

// General purposes
const fetchAllProducts = (
  pagination,
  filter,
  onSuccess,
  onError,
  onFinish = () => {}
) => {
  const url = `${config.server.url}${config.server.routes.getAllProducts}`;
  return axios
    .get(url, { params: { ...pagination, ...filter } })
    .then(onSuccess)
    .catch(onError)
    .finally(onFinish);
};

export const fetchAllBrands = (onSuccess, onError) => {
  const url = `${config.server.url}${config.server.routes.getAllBrands}`;
  return axios.get(url).then(onSuccess).catch(onError);
};

// Specific purposes
export const fetchProductsBySold = (onSuccess, onError) => {
  const pagination = config.query.products["bySold"];
  return fetchAllProducts(pagination, { fetchAll: true }, onSuccess, onError);
};

export const fetchProductsByDate = (onSuccess, onError) => {
  const pagination = config.query.products["byDate"];
  return fetchAllProducts(pagination, { fetchAll: true }, onSuccess, onError);
};

export const fetchPaginatedProducts = (
  pagination,
  filter,
  onSuccess,
  onError,
  onFinish
) => {
  return fetchAllProducts(pagination, filter, onSuccess, onError, onFinish);
};
