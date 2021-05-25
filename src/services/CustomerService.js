import {
  USER_PREFIX,
  CUSTOMER_PREFIX,
  STATISTIC_PREFIX,
  BILLING_PREFIX,
} from "../utils/Constant";
import { requestWithToken, publicRequest } from "./HttpServices";

const USER_PROFILE_PATH = "/profile";
const DEACTIVATE_ACCOUNT_PATH = "/deactivateaccount";
const TWOFA_ENABLE_PATH = "/authorization/registerphonenumber";
const VERIFY_OTP_CODE_PATH = "/authorization/mfa/otpcode/verify";
const UPDATE_PASSWORD_PATH = "/authorization/user";
const GET_LOGIN_HISTORY_PATH = "/authorization/user";
const GET_ACCOUNT_INFORMATION_PATH = "/authorization/user/";
const CUSTOMER_LOGOUT_PATH = "/authorization/logout";
const CUSTOMER_CHECKEMAIL = '/authorization/checkemail';
const LOGIN_PATH = "/authorization/login";
const INVOICE_ACTIVITY_STATISTIC_PATH = "/wallet";
const SETTINGS_PATH = "/authorization/settings";
const RESEND_OTP_PATH = "/authorization/mfa/otpcode";

export const GetCustomerSettings = () =>
  requestWithToken(`${CUSTOMER_PREFIX}${SETTINGS_PATH}`, {
    method: "GET"
  });

export const CustomerAuthentication = (data) =>
  publicRequest(`${CUSTOMER_PREFIX}${LOGIN_PATH}`, {
    method: "POST",
    data,
  });

export const CustomerLogout = () =>
  requestWithToken(`${CUSTOMER_PREFIX}${CUSTOMER_LOGOUT_PATH}`, {
    method: "GET",
  });

export const ResendVerificationEmail = (userId) =>
  requestWithToken(
    `${CUSTOMER_PREFIX}/authorization/user/${userId}/validateaccount/resend`,
    {
      method: "GET",
    }
  );

export const GetUserProfile = () =>
  requestWithToken(`${CUSTOMER_PREFIX}${USER_PREFIX}${USER_PROFILE_PATH}`, {
    method: "GET",
  });

export const GetAccountInformation = (userId) =>
  requestWithToken(`${CUSTOMER_PREFIX}${GET_ACCOUNT_INFORMATION_PATH}${userId}`, {
    method: "GET",
  });

export const Enable2FA = (data) =>
  requestWithToken(`${CUSTOMER_PREFIX}${TWOFA_ENABLE_PATH}`, {
    method: "PUT",
    data,
  });

export const VerifyOTPCode = (data) =>
  requestWithToken(`${CUSTOMER_PREFIX}${VERIFY_OTP_CODE_PATH}`, {
    method: "POST",
    data,
  });

export const ResendOtpCode = () =>
  requestWithToken(`${CUSTOMER_PREFIX}${RESEND_OTP_PATH}`, {
    method: "GET"
  });

export const UpdateUserProfile = (id, data) =>
  requestWithToken(`${USER_PREFIX}${USER_PROFILE_PATH}/${id}`, {
    method: "PUT",
    data,
  });

export const UpdateNewPassword = (data, userId) =>
  requestWithToken(
    `${CUSTOMER_PREFIX}${UPDATE_PASSWORD_PATH}/${userId}/updatepassword`,
    {
      method: "PUT",
      data,
    }
  );

export const GetCustomerLoginHistory = (userId, params) =>
  requestWithToken(
    `${CUSTOMER_PREFIX}${GET_LOGIN_HISTORY_PATH}/${userId}/loginActivity`,
    {
      method: "GET",
      params,
    }
  );

export const GetRecentEarningActivity = (params) =>
  requestWithToken(
    `${STATISTIC_PREFIX}/BITCOIN/activity`,
    {
      method: "GET",
      params,
    }
  );

export const DeactiveUserProfile = (data) =>
  requestWithToken(`${USER_PREFIX}${DEACTIVATE_ACCOUNT_PATH}`, {
    method: "PUT",
    data,
  });

export const GetBillingHistory = () =>
  requestWithToken(`${BILLING_PREFIX}/getBillingHistory`, {
    method: "GET",
  });

export const CheckCustomerEmail = (email, reverse) =>
  requestWithToken(
    `${CUSTOMER_PREFIX}${CUSTOMER_CHECKEMAIL}/${email}${reverse ? '?reverse=true' : ''}`,
    {
      method: "GET"
    }
  );

