import axios from "axios";
import * as auth from "./auth";
import config from "config.json";

export const updateUserProfile = (values, onSuccess, onError, onFinish) => {
  const url = `${config.server.url}${config.server.routes.updateProfile}`;
  return axios({
    method: "PATCH",
    url,
    headers: {
      ...auth.defaultHeaders,
      ...auth.getAuthHeader(),
    },
    data: values,
  })
    .then(onSuccess)
    .catch(onError)
    .finally(onFinish);
};

export const updateUserEmail = (values, onSuccess, onError, onFinish) => {
  const url = `${config.server.url}${config.server.routes.updateEmail}`;
  return axios({
    method: "PATCH",
    url,
    headers: {
      ...auth.defaultHeaders,
      ...auth.getAuthHeader(),
    },
    data: {
      email: values.newEmail,
    },
  })
    .then(onSuccess)
    .catch(onError)
    .finally(onFinish);
};

export const addItemToCart = (item, onSuccess, onError) => {
  const url = `${config.server.url}${config.server.routes.addItemToCart}`;
  return axios({
    method: "POST",
    url,
    headers: {
      ...auth.defaultHeaders,
      ...auth.getAuthHeader(),
    },
    data: {
      itemId: item._id,
    },
  })
    .then(onSuccess)
    .catch(onError);
};
