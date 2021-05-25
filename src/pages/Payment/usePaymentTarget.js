import { useLocation } from "react-router";
import queryString from "query-string";
import get from "lodash/get";

export const usePaymentTarget = () => {
  const location = useLocation();
  const paymentTarget = get(queryString.parse(location.search), "screen", "coinclustr-account");

  return paymentTarget;
}