import axios from "axios";
import config from "../config.json";

export const fetchAllProducts = async (options) => {
  try {
    const url = `${config.server.development}${config.server.routes.getAllProducts}`;
    const body = { skip: options.skip, limit: options.limit };
    const products = await axios.get(url, body);
    return products;
  } catch (err) {
    console.log(err);
  }
};
