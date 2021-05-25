import { requestWithToken } from "./HttpServices";

import {
  BILLING_PREFIX,
} from "../utils/Constant";

const SAVE_SUBSCRIPTION_PATH = "/billing/subscription";
const GET_SUBSCRIPTION_DETAIL_PATH = "/billing/subscription";
const UPGRADE_TO_PREMIUM_PLAN_PATH = "/billing/subscription";
const DOWNGRADE_TO_BASIC_PLAN_PATH = "/billing/subscription";
const POST_TOPUP_PATH = "/billing/topup";
const GET_TOPUPS_PATH = "/billing/topup/topups";

export const SaveSubscription = (data) =>
  requestWithToken(SAVE_SUBSCRIPTION_PATH, {
    method: "POST",
    data,
  });

export const GetSubscriptionDetail = () =>
  requestWithToken(`${GET_SUBSCRIPTION_DETAIL_PATH}`, {
    method: "GET",
  });

export const UpgradeToPremiumPlan = (data) =>
  requestWithToken(`${UPGRADE_TO_PREMIUM_PLAN_PATH}/updateToPremium`, {
    method: "PUT",
    data,
  });

export const DowngradeToBasicPlan = () =>
  requestWithToken(`${DOWNGRADE_TO_BASIC_PLAN_PATH}/updateToBasic`, {
    method: "PUT",
  });

export const GetBillingHistory = () =>
  requestWithToken(`${BILLING_PREFIX}/getBillingHistory`, {
    method: "GET",
  });

export const PostTopupAddress = (data) =>
  requestWithToken(`${POST_TOPUP_PATH}`, {
    method: "POST",
    data
  });

export const GetTopups = (params) =>
  requestWithToken(`${GET_TOPUPS_PATH}`, {
    method: "GET",
    params
  });
