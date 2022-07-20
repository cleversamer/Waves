/* eslint-disable import/no-anonymous-default-export */
export default function (query) {
  const queryParams = [];
  for (let key in query) {
    queryParams.push(`${key}=${query[key]}`);
  }

  return queryParams.join("&");
}
