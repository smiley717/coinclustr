import Payments from "./mockData/payment/Payments.json";
import PaymentDetails from "./mockData/payment/PaymentDetails.json";
import PreValidate from "./mockData/payment/PreValidate.json";

const paymentList = Payments;
const preValidate = PreValidate;

export const PaymentServiceStub = (mock) => {
  
  mock.onGet(/^\/payment\/payments\?(.*)/).reply((config) => {
    return [200, paymentList];
  });
  
  mock.onGet(/^\/payment\/payment\/address\/verify\?(.*)/).reply(() => {
    return [200, null];
  });

  mock.onGet(/^\/payment\/payments\/(.*)/).reply((config) => {
    return [200, PaymentDetails];
  });

  mock.onPost("/payment/prevalidate").reply((config) => {
    return [200, preValidate];
  });

  mock.onPut(/^\/payment\/prevalidate\/(.*)/).reply((config) => {
    return [204, null];
  });

  mock.onPost(/^\/payment\/sendpayment​\/(.*)/).reply((config) => {
    return [204, null];
  });
  
};
