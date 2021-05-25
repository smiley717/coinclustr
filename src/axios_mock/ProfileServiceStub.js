import Profile from "./mockData/Profile.json";
import Token from "./mockData/customer/Token.json";
import BillingHistory from "./mockData/BillingHistory";
import Cookies from "js-cookie";

const profile = Profile;
const billingHistory = BillingHistory;

export const ProfileServiceStub = (mock) => {
  // ! dummy fake the toke is already has in the cookies whien the authentication done
  Cookies.set("token", Token);

  mock.onGet("/user/logout").reply((config) => {
    return [204, { Authorization: "test" }];
  });

  mock
    .onPut("/user/profile/a06a50864261fdbebe9a41ad940b094ad1acf2fb")
    .reply((config) => {
      return [200, profile, { Authorization: "test" }];
    });

  mock.onPut("/user/deactivateaccount").reply((config) => {
    const data = JSON.parse(config.data);
    const { email } = data;
    if (email === profile.email) {
      return [200, profile, { Authorization: "test" }];
    } else {
      return [
        404,
        {
          error: 404,
          message: "User not found",
        },
        { Authorization: "test" },
      ];
    }
  });

  mock.onGet("/billing/getBillingHistory").reply((config) => {
    return [200, billingHistory, { Authorization: "test" }];
  });

  mock.onPut(/\/billing\/(.*)\/updateToPremium/).reply((config) => {
    profile.accountType = "PREMIUM";
    Cookies.set("userData", profile);
    return [204, { Authorization: "test" }];
  });

  mock.onPut(/\/billing\/(.*)\/updateToBasic/).reply((config) => {
    profile.accountType = "BASIC";
    Cookies.set("userData", profile);
    return [204, { Authorization: "test" }];
  });
};
