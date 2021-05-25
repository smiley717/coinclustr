import Wallets from "./mockData/Wallets.json";
import Payments from "./mockData/payment/Payments.json";
import NewWallet from "./mockData/NewWallet.json";
import WalletAddressVerify from "./mockData/WalletAddressVerify.json";

const walletList = Wallets;
const paymentList = Payments;
const walletAddressVerify = WalletAddressVerify;
export const btcPrice = 46200;

export const WalletServiceStub = (mock) => {
  mock.onGet("/wallet/secure/wallet/payments").reply((config) => {
    return [200, paymentList];
  });

  // get builtin wallets
  mock.onGet("/wallet/secure/wallet/wallets").reply((config) => {
    return [200, walletList];
  });

  mock
    .onGet("/wallet/secure/wallet/1016b9d857afb5e5a63388173eceb014c85055f1")
    .reply((config) => {
      return [200, walletList[0]];
    });

  mock
    .onPut("/wallet/secure/wallet/1016b9d857afb5e5a63388173eceb014c85055f1/update")
    .reply((config) => {
      return [200, []];
    });

  mock
    .onPut(
      "/wallet/secure/wallet/1016b9d857afb5e5a63388173eceb014c85055f1/generateApiKey"
    )
    .reply((config) => {
      return [200, { apiKey: "8a9270996424c1dd0538cdfb256e63e61430222f" }];
    });

  mock.onPost("/wallet/secure/wallet/create").reply((config) => {
    let params = JSON.parse(config.data);
    let newWallet = NewWallet;
    newWallet.name = params["walletName"];
    newWallet.forwardingAddress = params["walletAddress"];
    newWallet.webhook_url = params["webhookUrl"];
    newWallet.type = params["currency"];
    walletList.push(newWallet);
    return [204, null];
  });

  mock.onGet("/wallet/wallets").reply((config) => {
    return [200, []];
  });

  mock.onGet("/wallet/address/verify").reply((config) => {
    return [204, walletAddressVerify];
  });

  mock.onPost(/\/wallet\/convert/).reply((config) => {
    const data = JSON.parse(config.data);
    return [200, data.amount * btcPrice];
  });
};
