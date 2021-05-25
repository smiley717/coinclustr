import Profile from "./mockData/customer/Profile.json";
import AccountProfile from "./mockData/Profile.json";
import Token from "./mockData/customer/Token.json";
import LoginActivity from "./mockData/customer/LoginActivity.json";
import Setting from "./mockData/customer/Settings.json";

const profile = Profile;
const account_profile = AccountProfile;
const token = Token;
const loginActivity = LoginActivity;
const settings = Setting;

export const CustomerAuthorizationServiceStub = (mock) => {

  mock.onGet("/customer/authorization/settings").reply((config) => {
    return [200, settings];
  });

  mock.onGet("/customer/authorization/login").reply((config) => {
    return [200, token];
  });

  mock.onGet("/customer/authorization/logout").reply((config) => {
    return [200];
  });

  mock
    .onGet(
      "/customer/authorization/user/a8abcff558d4836833f4f821f7dfdb1e9ff14772"
    )
    .reply((config) => {
      return [200, account_profile];
    });

  mock.onGet("/customer/user/profile").reply((config) => {
    return [200, profile];
  });

  mock
    .onGet(/^\/customer\/authorization\/user\/(.*)\/loginActivity/)
    .reply((config) => {
      return [200, loginActivity];
    });

  mock
    .onGet(/^\/customer\/authorization\/resetpassword\/(.*)/)
    .reply((config) => {
      return [204];
    });

  mock
    .onGet(/^\/customer\/authorization\/resetpassword\/token\/(.*)/)
    .reply((config) => {
      const data = {
        createdAt: "2021-02-08T18:16:47.500Z",
        email: "string",
        id: "string",
      };
      return [200, data];
    });

  mock
    .onPut(/^\/customer\/authorization\/user\/(.*)\/resetpassword\/(.*)/)
    .reply((config) => {
      return [200];
    });

  mock.onGet("​/customer​/authorization​/mfa​/otpcode").reply((config) => {
    return [200];
  });

  mock
    .onPost("/customer/authorization/mfa/otpcode/verify")
    .reply((config) => {
      return [200, token];
    });

  mock
    .onPost("/customer/authorization/mfa/otpcode")
    .reply((config) => {
      return [204];
    });

  mock
    .onPut("​​​/customer​/authorization​/mfa​/registerphonenumber")
    .reply((config) => {
      return [204];
    });

  mock
    .onGet(/^\/customer\/authorization\/checkemail\/(.*)/)
    .reply((config) => {
      return [200];
    });

};
