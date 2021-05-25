import { requestWithToken } from "./HttpServices";

import { INVOICE_PREFIX } from "../utils/Constant";

const CREATE_NEW_INVOICE_PATH = "/create";
const GET_ALL_RELATED_INVOICE_PATH = "/invoices";
const GET_SINGLE_INVOICE_PATH = "/invoice";
const GET_INVOICES_STATS = "/invoices/stats";

export const CreateNewInvoice = (data) =>
  requestWithToken(`${INVOICE_PREFIX}${CREATE_NEW_INVOICE_PATH}`, {
    method: "POST",
    data,
  });

export const GetSingleInvoice = (ids) =>
  requestWithToken(`/invoicing${GET_SINGLE_INVOICE_PATH}/${ids}`, {
    method: "GET",
  });

export const GetAllInvoices = (params) =>
  requestWithToken(`${INVOICE_PREFIX}${GET_ALL_RELATED_INVOICE_PATH}`, {
    method: "GET",
    params,
  });

export const GetInvoiceStats = (params) =>
  requestWithToken(`${INVOICE_PREFIX}${GET_INVOICES_STATS}`, {
    method: "GET",
    params,
  });

export const DeleteInvoice = (invoiceid) =>
  requestWithToken(`/ccinvoicing/invoicing/invoice/${invoiceid}`, {
    method: "DELETE",
  });
