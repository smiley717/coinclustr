// import "../wdyr";

import React, { useEffect, Suspense, lazy } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { message } from "antd";
import MockAdapter from "axios-mock-adapter";
import * as axios from "axios";

import LayoutFrame from "./Layout";
import Loader from "../components/Loader";
import theme from "../utils/theme";
import GlobalStyle from "./createGlobalStyle";

import { CustomerAuthorizationServiceStub } from "../axios_mock/CustomerAuthorizationServiceStub";
import { InvoiceServiceStub } from "../axios_mock/InvoiceServiceStub";
import { StatisticServiceStub } from "../axios_mock/StatisticServiceStub";
import { ProfileServiceStub } from "../axios_mock/ProfileServiceStub";
import { WalletServiceStub } from "../axios_mock/WalletServiceStub";
import { PaymentServiceStub } from "../axios_mock/PaymentServiceStub";
import { WidgetServiceStub } from "../axios_mock/WidgetServiceStub";
import { BillingServiceStub } from "../axios_mock/BillingServiceStub";
import { CMServicesStub } from "../axios_mock/CMServicesStub";
import { MarketServiceStub } from "../axios_mock/MarketServiceStub";
import { NotificationServiceStub } from "../axios_mock/NotificationServiceStub";

import GoogleAnalytics from "../utils/GoogleAnalytics";

import { RecoilRoot } from "recoil";
import PaymantDetails from "pages/Payment/PaymantDetails";

const HomePage = lazy(() => import("../pages/HomePage"));

const WalletPage = lazy(() => import("../pages/WalletPage"));

const SyncWalletPage = lazy(() => import("../pages/Wallet/SyncWalletPage"));

const CreateWidgetPage = lazy(() => import("../pages/Wallet/CreateWidgetPage"));
const TopUpsHistoryPage = lazy(() => import("../pages/Wallet/TopUpsHistoryPage"));

const EditWidgetPage = lazy(() => import("../pages/Wallet/EditWidgetPage"));

const PreviewWidgetPage = lazy(() =>
  import("../pages/Wallet/PreviewWidgetPage")
);

const InvoicePage = lazy(() => import("../pages/Invoice/InvoicePage"));

const PreviewInvoicePage = lazy(() =>
  import("../pages/Invoice/PreviewInvoicePage")
);

const CreateInvoicePage = lazy(() =>
  import("../pages/Invoice/CreateInvoicePage")
);

const PaymentPage = lazy(() => import("../pages/PaymentPage"));

const CreatePaymentPage = lazy(() =>
  import("../pages/Payment/CreatePaymentPage")
);

const SettingPage = lazy(() => import("../pages/SettingPage"));

const APIPage = lazy(() => import("../pages/APIPage"));

const NotificationPage = lazy(() => import("../pages/NotificationPage"));

const App = () => {
  useEffect(() => {
    message.config({
      top: 20,
      duration: 2,
    });
  }, []);

  if (
    process.env.REACT_APP_MOCK_SERVER === true ||
    process.env.REACT_APP_MOCK_SERVER === "true"
  ) {
    var mock = new MockAdapter(axios);
    CustomerAuthorizationServiceStub(mock);
    InvoiceServiceStub(mock);
    BillingServiceStub(mock);
    StatisticServiceStub(mock);
    ProfileServiceStub(mock);
    WalletServiceStub(mock);
    PaymentServiceStub(mock);
    WidgetServiceStub(mock);
    CMServicesStub(mock);
    MarketServiceStub(mock);
    NotificationServiceStub(mock);
  }
  useEffect(() => {
    message.config({
      top: 80,
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RecoilRoot>
        <Router basename={"/dashboard"}>
          <LayoutFrame>
            {GoogleAnalytics.init() && <GoogleAnalytics.RouteTracker />}
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/wallets" component={WalletPage} />
                <Route exact path="/wallets/sync" component={SyncWalletPage} />
                <Route
                  exact
                  path="/wallets/:walletid/widget/create"
                  component={CreateWidgetPage}
                />
                <Route
                  exact
                  path="/wallet/:walletid/topups"
                  component={TopUpsHistoryPage}
                />
                <Route
                  exact
                  path="/wallets/:walletid/widget/:widgetid"
                  component={PreviewWidgetPage}
                />
                <Route
                  exact
                  path="/wallets/:walletid/widget/:widgetid/edit"
                  component={EditWidgetPage}
                />
                <Route exact path="/invoices" component={InvoicePage} />
                <Route
                  exact
                  path="/invoices/create"
                  component={CreateInvoicePage}
                />
                <Route
                  exact
                  path="/invoices/:invoiceid"
                  component={PreviewInvoicePage}
                />
                <Route exact path="/payments" component={PaymentPage} />
                <Route
                  exact
                  path="/payments/details"
                  component={PaymantDetails}
                />
                <Route
                  exact
                  path="/payments/create"
                  component={CreatePaymentPage}
                />
                <Route path="/settings" component={SettingPage} />
                <Route path="/apis" component={APIPage} />
                <Route path="/notifications" component={NotificationPage} />
              </Switch>
            </Suspense>
          </LayoutFrame>
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
