import { requestWithToken, requestWith2faToken } from "./HttpServices";

import { PAYMENT_PREFIX } from "../utils/Constant";

const GET_CREATE_PAYMENTS_PATH = "/payments/create";
const POST_SEND_PAYMENT_PATH = "/sendpayment";
const GET_SINGLE_PAYMENT_PATH = "/payments";
const GET_PAYMENTS_PATH = "/payments";
const GET_ADDRESS_VERIFY = "/payment/address/verify";
const PREVALIDATE_PAYMENT = "/prevalidate";

export const GetPaymentFromRef = (ref) =>
  requestWithToken(`${PAYMENT_PREFIX}${GET_CREATE_PAYMENTS_PATH}/${ref}`, {
    method: "GET",
  });

export const GetPaymentsFromRefs = (refs) =>
  requestWithToken(`${PAYMENT_PREFIX}${GET_SINGLE_PAYMENT_PATH}?${refs}`, {
    method: "GET",
  });

export const GetAllPayments = (params) => {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return requestWithToken(`${PAYMENT_PREFIX}${GET_PAYMENTS_PATH}?${queryString}`, {
    method: "GET",
  });
}

export const GetAddressVerified = (params) => {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return requestWithToken(`${PAYMENT_PREFIX}${GET_ADDRESS_VERIFY}?${queryString}`, {
    method: "GET",
  });
}

export const GetPaymentDetails = (refs) =>
  requestWithToken(`${PAYMENT_PREFIX}${GET_PAYMENTS_PATH}/${refs}`, {
    method: "GET",
  });

export const PreValidatePayment = (data, id) =>
  requestWithToken(`${PAYMENT_PREFIX}${PREVALIDATE_PAYMENT}${id ? '/' + id : ''}`, {
    method: id ? "PUT" : "POST",
    data,
  });

export const SendPayment = (id, token) =>
  requestWith2faToken(`${PAYMENT_PREFIX}${POST_SEND_PAYMENT_PATH}/${id}`, {
    method: "POST"
  }, token);