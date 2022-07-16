import axios from "axios";
import config from "../config.json";

export const fetchAllProducts = (options, onSuccess, onError) => {
  const url = `${config.server.url}${config.server.routes.getAllProducts}?skip=${options.skip}&limit=${options.limit}`;
  return axios.get(url).then(onSuccess).catch(onError);
};
