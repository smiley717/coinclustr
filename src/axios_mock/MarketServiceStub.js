import BitcoinToUsd from "./mockData/market/coins/BitcoinToUsd.json";
import EthereumToUsd from "./mockData/market/coins/EthereumToUsd.json";
import LitecoinToUsd from "./mockData/market/coins/LitecoinToUsd.json";

const bitcoinToUsd = BitcoinToUsd;
const ethereumToUsd = EthereumToUsd;
const litecoinToUsd = LitecoinToUsd;

export const MarketServiceStub = (mock) => {
  
  mock.onGet(/^\/market\/coins\/BITCOIN\/market_chart\/range(.*)/).reply((config) => {
    return [200, bitcoinToUsd];
  });

  mock.onGet(/^\/market\/coins\/ETHEREUM\/market_chart\/range(.*)/).reply((config) => {
    return [200, ethereumToUsd];
  });

  mock.onGet(/^\/market\/coins\/LITECOIN\/market_chart\/range(.*)/).reply((config) => {
    return [200, litecoinToUsd];
  });

};
