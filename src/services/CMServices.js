import { CMS_PREFIX } from "../utils/Constant";
import { requestWithToken } from "./HttpServices";

const GET_NEWS_ITEM = "/newsitems";

export const GetNewsItem = (id) =>
  requestWithToken(`${CMS_PREFIX}${GET_NEWS_ITEM}/${id}`, {
    method: "GET",
  });
