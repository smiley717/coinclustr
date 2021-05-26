export const BASE_URL = process.env.REACT_APP_API_URL;

export const INVOICE_PREFIX = "/invoicing";
export const USER_PREFIX = "/user";
export const STATISTIC_PREFIX = "/wallet/statistics";
export const SECURE_WALLET_PREFIX = "/wallet/secure/wallet";
export const WALLET_PREFIX = "/wallet";
export const PAYMENT_PREFIX = "/payment";
export const BILLING_PREFIX = "/billing";
export const CUSTOMER_PREFIX = "/customer";
export const AUTHORIZATION_PREFIX = "/customer/authorization";
export const CMS_PREFIX = "/cms";
export const MARKET_PREFIX = "/market";

export const REQUEST_TIMEOUT = 20000;
export const RECORD_PER_PAGE = 10;
export const DATETIME_FORMAT = "YYYY/MM/DD HH:mm:ss";

export const VALIDATE_MESSAGE = "delete";

export const GA_TRACKING_ID = "UA-67014091-3";

export const FILTER_PAYMENT_LIST = [
  { id: 1, label: "Action: sent", value: "SENT", searchPattern: ["action: sent", "action: send", "action:sent", "action:send", "send", "sent"] },
  { id: 2, label: "Action: received", value: "RECEIVED", searchPattern: ["action: received", "action:received", "action: receive", "action:receive", "received", "receive"] },
  { id: 3, label: "Coin: bitcoin", value: "coin:bitcoin", searchPattern: ["coin: bitcoin", "coin:bitcoin", "bitcoin", "btc",] },
];

export const FILTER_INVOICE_LIST = [
  { id: 1, label: "Status: complete", value: "COMPLETE", searchPattern: ["status: complete", "status:complete", "complete", "complete"] },
  { id: 2, label: "Status: pending", value: "PENDING", searchPattern: ["status: pending", "status:pending", "pending", "pending"] },
  { id: 3, label: "Status: received", value: "RECEIVED", searchPattern: ["status: received", "status:received", "received", "receive"] },
  { id: 4, label: "Status: underpaid", value: "UNDERPAID", searchPattern: ["status: underpaid", "status:underpaid", "underpaid", "underpaid"] },
  { id: 5, label: "Coin: bitcoin", value: "coin:bitcoin", searchPattern: ["coin: bitcoin", "coin:bitcoin", "bitcoin", "btc",]  }
];

export const NOTIFICATIONS_EVENT_AND_LABEL = {
  INVOICE_UPDATED: {
    event_label: "Invoice updated",
    button_label: "View Invoice",
  },
  INVOICE_COMPLETE: {
    event_label: "Invoice completed",
    button_label: "View Invoice",
  },
  PAYMENT_RECEIVED: {
    event_label: "Payment received invoices",
    button_label: "View Payment",
  },
  SUBSCRIPTION_DUE: {
    event_label: "Subscription payment due",
    button_label: "View subscription settings",
  },
  SUBSCRIPTION_OVERDUE: {
    event_label: "Subscription payment overdue",
    button_label: "View subscription settings",
  },
};

export const NOTIFICATIONS_SETTINGS_CONTROL = {
  SUCCESSFUL_PAYMENT: "Successful Payment",
  NEW_TRANSACTION: "New Transaction",
  QUOTA_REMINDERS: "Quota Reminders",
};
