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
