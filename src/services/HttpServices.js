import axios from "axios";

import { BASE_URL, REQUEST_TIMEOUT } from "../utils/Constant";
import Cookies from "js-cookie";

export const publicRequest = (url, info) => {
  const publicRequestInstance = axios.create({
    baseURL: getBaseUrl(),
    withCredentials: false,
    url: `${url}`,
  });
  publicRequestInstance.defaults.timeout = REQUEST_TIMEOUT;
  return publicRequestInstance(info).catch((err) => {
    throw err;
  });
};

export const request = (url, info, token) => {
  const api_request = axios.create({
    baseURL: getBaseUrl(),
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

export const getBaseUrl = () => {
  if (process.env.NODE_ENV == "development"){
    return "https://api.bss-cclustr.com/"
  }
  return "/api";
}
