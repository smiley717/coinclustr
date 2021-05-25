import Invoice from "./mockData/invoice/Invoice.json";
import Subscription from "./mockData/billing/Subscription.json";
import TopUp from "./mockData/billing/TopUp.json";
import TopUpsHistory from "./mockData/billing/TopUpHistory.json";

const invoice = Invoice;
const subscription = Subscription;

export const BillingServiceStub = (mock) => {
  
  mock.onPost(/\/billing\/topup/).reply((config) => {
    return [200, TopUp];
  });

  mock.onGet(/\/billing\/topup\/topups(.*)/).reply((config) => {
    return [200, TopUpsHistory];
  });

  mock.onGet(/^\/subscription/).reply((config) => {
    return [200, subscription];
  });

  mock.onPost(/^\/subscription/).reply((config) => {
    return [201, subscription];
  });

  mock.onPut(/^\/subscription\/updateToBasic/).reply((config) => {
    return [204];
  });

  mock.onPut(/^\/subscription\/updateToPremium/).reply((config) => {
    return [204];
  });

};
