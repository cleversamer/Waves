import axios from "axios";
import config from "../config.json";

export const fetchAllProducts = async (options) => {
  try {
    const url = `${config.server.routes.getAllProducts}/?skip=${options.skip}&&limit=${options.limit}`;
    return await axios.get(url);
  } catch (err) {
    console.log(err);
  }
};
