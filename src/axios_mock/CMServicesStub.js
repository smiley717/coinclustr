import NewsItem1 from "./mockData/cms/newsitems/6007f5c7dca27c10f4b35233.json";
import NewsItem2 from "./mockData/cms/newsitems/6007f4e0dca27c10f4b35232.json";

const newsItem1 = NewsItem1;
const newsItem2 = NewsItem2;

export const CMServicesStub = (mock) => {
  
  mock.onGet("/cms/newsitems/6007f5c7dca27c10f4b35233").reply((config) => {
    return [200, newsItem1];
  });

  mock.onGet("/cms/newsitems/6007f4e0dca27c10f4b35232").reply((config) => {
    return [200, newsItem2];
  });

};
