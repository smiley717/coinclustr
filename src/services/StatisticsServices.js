import { requestWithToken } from "./HttpServices";

import { STATISTIC_PREFIX } from "../utils/Constant";

const INVOICE_ACTIVITY_STATISTIC_PATH = "/wallet";

export const GetInvoiceActivity = (params) =>
  requestWithToken(
    `${STATISTIC_PREFIX}${INVOICE_ACTIVITY_STATISTIC_PATH}/BITCOIN/activity`,
    {
      method: "GET",
      params,
    }
  );
