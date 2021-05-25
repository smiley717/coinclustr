import Statistics from "./mockData/Statistics.json";
import WalletActivity from "./mockData/WalletActivity.json";

const statistics = Statistics;
const walletActivity = WalletActivity;
export const StatisticServiceStub = (mock) => {
  
  mock.onGet("/stats/invoices/activity").reply((config) => {
    return [200, statistics];
  });

  mock.onGet(/^\/wallet\/statistics\/BITCOIN\/activity/).reply((config) => {
    // TODO can handle data for different params HOURLY/DAILY MONTHLY if required.
    return [200, walletActivity];
  });

};
