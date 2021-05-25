import { requestWithToken } from "./HttpServices";

import { MARKET_PREFIX } from "../utils/Constant";

export const GetMarketChartInRange = (coin, params) =>
  requestWithToken(`${MARKET_PREFIX}/coins/${coin}/market_chart/range`, {
    method: "GET",
    params,
  });

export const GetMarketInfo = () =>   
  requestWithToken(`${MARKET_PREFIX}/coins/markets_info?currency=usd`, {
    method: "GET"
});

export const ConvertCoinToCurrency = (params) =>
  requestWithToken(`${MARKET_PREFIX}/conversion/coinToCurrency`, {
    method: "GET",
    params,
  });
