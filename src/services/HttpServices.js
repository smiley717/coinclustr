import axios from "axios";

import { BASE_URL, REQUEST_TIMEOUT } from "../utils/Constant";
import Cookies from "js-cookie";

export const publicRequest = (url, info) => {
  console.log(process.env.NODE_ENV)
  console.log("BASE_URL: "+BASE_URL)
  const publicRequestInstance = axios.create({
    baseURL: `${BASE_URL}`,
    withCredentials: false,
    url: `${url}`,
  });
  publicRequestInstance.defaults.timeout = REQUEST_TIMEOUT;
  return publicRequestInstance(info).catch((err) => {
    throw err;
  });
};

export const request = (url, info, token) => {
  console.log(process.env.NODE_ENV)
  console.log("BASE_URL: "+BASE_URL)
  const api_request = axios.create({
    baseURL: `${BASE_URL}`,
    withCredentials: false,
    url: `${url}`,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  api_request.defaults.timeout = REQUEST_TIMEOUT;
  return api_request(info).catch((err) => {
    throw err;
  });
};

export const requestWithToken = (url, info) => {
  var jwtToken = Cookies.get("token");
  return request(url, info, jwtToken);
};

export const requestWith2faToken = (url, info, token) => {
  return request(url, info, token);
};
