import { requestWithToken } from "./HttpServices";

import { SECURE_WALLET_PREFIX, WALLET_PREFIX } from "../utils/Constant";

const SYNC_WALLETS_PATH = "/wallet";
const GET_WALLETS_PATH = "/wallets";
const VERIFY_WALLET_PATH = "/wallet/address/verify";
const CREATE_NEW_WIDGET_PATH = "/widget";
const GET_CUSTOMER_WALLETS = "/wallet/secure/wallet/wallets";


/* NEW VERSION */
export const SyncNewWallet = (data) =>
  requestWithToken(`${WALLET_PREFIX}${SYNC_WALLETS_PATH}`, {
    method: "POST",
    data,
  });

export const GetSyncWallet = () =>
  requestWithToken(`${WALLET_PREFIX}${GET_WALLETS_PATH}`, {
    method: "GET",
  });

export const GetBuiltInWallets = () =>
    requestWithToken(`${GET_CUSTOMER_WALLETS}`, {
        method: "GET",
    });

export const GetSingleWalletDetail = (id) =>
  requestWithToken(`${SECURE_WALLET_PREFIX}/${id}`, {
    method: "GET",
  });

export const VerifyWalletAddress = (params) =>
  requestWithToken(`${WALLET_PREFIX}${VERIFY_WALLET_PATH}`, {
    method: "GET",
    params,
  });

export const CreateNewWidget = (data, walletId) =>
  requestWithToken(`${WALLET_PREFIX}/wallet/${walletId}/${CREATE_NEW_WIDGET_PATH}`, {
    method: "POST",
    data,
  });

export const EditWidget = (data, walletId, widgetId) =>
  requestWithToken(`${WALLET_PREFIX}/wallet/${walletId}/widget/${widgetId}`, {
    method: "PUT",
    data,
  });

export const DeleteWidget = (data, walletId, widgetId) =>
  requestWithToken(`${WALLET_PREFIX}/wallet/${walletId}/widget/${widgetId}`, {
    method: "DELETE",
  });

export const ListAllWidgetForSingleWallet = (walletId) =>
  requestWithToken(`${WALLET_PREFIX}/${walletId}/widgets/`, {
    method: "GET",
  });

export const GetSingleDetailWidget = (walletId, widgetId) =>
  requestWithToken(`${WALLET_PREFIX}/${walletId}/widget/${widgetId}`, {
    method: "GET",
  });

export const GetInvoicesForWallets = (params) => {
  const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  return requestWithToken(`${WALLET_PREFIX}/v2/getAllInvoices?${queryString}`, {
    method: "GET",
  });
}

export const GetInvoiceStatsForWallets = (params) =>
  requestWithToken(`${WALLET_PREFIX}/getInvoicesStats`, {
    method: "GET",
    params,
  });
