import React, { useState, useEffect } from "react";
import { Typography, message, Skeleton } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import get from "lodash/get";
import { css } from "glamor";

import { VerifyEmailModal, OTPModal } from "../components/modal";
import { profileDataState, settingsDateState } from "../recoil/user";

import { H3, Label } from "../styled/Typography";
import CustomCard from "../styled/CustomCard";
import CustomAlert from "../styled/CustomAlert";
import CustomButton from "../styled/CustomButton";
import MarketsChartCard from "../components/MarketsChartCard";
import PorfolioCard from "../components/PorfolioCard";
import DashboardWrapper from "../styled/DashboardWrapper";

import { GetBuiltInWallets, GetInvoiceStatsForWallets } from "../services/WalletServices";
import { GetNewsItem } from "../services/CMServices";

import { ReactComponent as WalletIcon } from "../img/icons/wallet.svg";
import { ReactComponent as FinanceIcon } from "../img/icons/finance.svg";
import { ReactComponent as IncomeIcon } from "../img/icons/income.svg";
import { ReactComponent as BitcoinIcon } from "../img/icons/bitcoin.svg";
import { ReactComponent as FileIcon } from "../img/icons/file.svg";
import { ReactComponent as FileCheckedIcon } from "../img/icons/file-checked.svg";
import { ReactComponent as FolderDeleteIcon } from "../img/icons/folder-delete.svg";
import { ReactComponent as BuyCurrencyIcon } from "../img/icons/buy-currency-icon.svg";
import { ReactComponent as CreateAWidgetIcon } from "../img/icons/create-a-widget-icon.svg";

const { Paragraph } = Typography;

const StatictisStyles = css({
  width: "240px",
});



const RoundedInvoiceIconStyles = css({
  width: "48px",
  height: "48px",
  position: "relative",
  display: "inline-block",
  "> svg": {
    content: " ",
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "block",
    transform: "translate(-50%, -50%)",
    width: "15px",
    height: "18px",
  },
});

const mediaQueries = {
  phone: "@media only screen and (max-width: 770px)"
};

const WelcomePanelStyle = css({
  [mediaQueries.phone]: {
    display: "block"
  },
  display: "flex"
});

const WelcomeBannerStyles = css({
  [mediaQueries.phone]: {
    width: "auto"
  },
  width: "752px",
  "& div": {

    [mediaQueries.phone]: {
      paddingRight: "28px !important",
    },
  },
});

const CallToActionStyles = css({
  [mediaQueries.phone]: {
    width: "auto"
  },
  width: "240px",
});

const RoundedQuickLinkIcon = css({
  width: "24px",
  height: "24px",
  position: "relative",
  display: "inline-block",
  "> svg": {
    content: " ",
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "block",
    transform: "translate(-50%, -50%)",
    width: "15px",
    height: "18px",
  },
});

const HomePage = () => {
  const [profileState] = useRecoilState(profileDataState);
  const [settingsState] = useRecoilState(settingsDateState);
  const [invoiceStatistics, setInvoiceStatistics] = useState({});
  const [isModalVerifyEmailVisible, setIsModalVerifyEmailVisible] = useState(
    false
  );
  const [isModalOTPVisible, setIsModalOTPVisible] = useState(false);
  const [builtInWallet, setBuiltInWallet] = useState([]);
  const [isFetchingBuiltInWallet, setIsFetchingBuiltInWallet] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);
  const [newsItemsHeading, setNewsItemsHeading] = useState({});
  const [newsItemsContent, setNewsItemsContent] = useState({});

  useEffect(() => {
    Promise.allSettled([
      GetBuiltInWallets(),
      GetNewsItem("6007f5c7dca27c10f4b35233"),
      GetNewsItem("6007f4e0dca27c10f4b35232"),
      GetInvoiceStatsForWallets({}),
    ])
      .then((res) => {
        if (res[0].status === "fulfilled") {
          setBuiltInWallet(get(res, "[0].value.data", ""));
        }
        if (res[1].status === "fulfilled") {
          setNewsItemsHeading(get(res, "[1].value.data", ""));
        }
        if (res[2].status === "fulfilled") {
          setNewsItemsContent(get(res, "[2].value.data", ""));
        }
        if (res[3].status === "fulfilled") {
          setInvoiceStatistics(get(res, "[3].value.data", {}));
        }
        setContentLoading(false);
        setIsFetchingBuiltInWallet(false);
      })
      .catch(() => {
        message.error("Error when fetch data");
      });
  }, []);

  const { complete, open, underpaid } = invoiceStatistics;
  const { mfaSettings: { mfa } = true, emailVerified = true } = settingsState;
  const { fullname, email } = profileState;

  return (
    <div className="container mx-auto my-8">
      <VerifyEmailModal
        email={email}
        visible={isModalVerifyEmailVisible}
        setVisible={setIsModalVerifyEmailVisible}
      />
      <OTPModal visible={isModalOTPVisible} setVisible={setIsModalOTPVisible} />
      <div className="flex justify-between flex-row mb-10">
        {contentLoading ? (
          <Skeleton />
        ) : (
          <div className="w-full items-start justify-between" {...WelcomePanelStyle}>
            <div className="mb-10 lg:mb-0" {...WelcomeBannerStyles}>
              <CustomAlert
                message={`${get(
                  newsItemsHeading,
                  "contentValue",
                  ""
                )}, ${fullname}!`}
                description={get(newsItemsContent, "contentValue", "")}
                closable
                className="default pt-7 pr-20 pb-7 pl-7"
                style={{ height: "100%" }}
              />
            </div>
            <div className="" {...CallToActionStyles}>
              {!emailVerified ? (
                <CustomAlert
                  message="Please, verify your email"
                  closable
                  className="secondary default cursor-pointer mb-3 pt-4 pr-12 pb-4 pl-4"
                  onClick={() => setIsModalVerifyEmailVisible(true)}
                />
              ) : null}
              {!mfa ? (
                <CustomAlert
                  message="Please, enable 2 step verification"
                  closable
                  className="secondary default cursor-pointer m-0 pt-4 pr-12 pb-4 pl-4"
                  onClick={() => setIsModalOTPVisible(true)}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>

      <div className="w-full mb-10">
        <H3>Quick Links</H3>
        <div className="flex items-center flex-wrap">
          {/* <div className="w-full md:w-auto mr-4 mb-4">
            <Link to="/wallets" className="quick-link-item">
              <CustomCard>
                <i
                  {...RoundedQuickLinkIcon}
                  className="bg-coinclustr-yellow bg-opacity-20 rounded-full mr-2"
                >
                  <BuyCurrencyIcon />
                </i>
                Buy currency
              </CustomCard>
            </Link>
          </div> */}
          <div className="w-full md:w-auto mr-4 mb-4">
            <Link to="/invoices/create" className="quick-link-item">
              <CustomCard>
                <i
                  {...RoundedQuickLinkIcon}
                  className="bg-coinclustr-red bg-opacity-20 rounded-full mr-2"
                >
                  <FinanceIcon />
                </i>
                Create an invoice
              </CustomCard>
            </Link>
          </div>
          {/* <div className="w-full md:w-auto mr-4 mb-4">
            <Link to="/invoice" className="quick-link-item">
              <CustomCard>
                <i
                  {...RoundedQuickLinkIcon}
                  className="bg-coinclustr-dark-blue bg-opacity-20 rounded-full mr-2"
                >
                  <IncomeIcon />
                </i>
                Create a test invoice
              </CustomCard>
            </Link>
          </div> */}
          <div className="w-full md:w-auto mr-4 mb-4">
            <Link to="/payments/create" className="quick-link-item">
              <CustomCard>
                <i
                  {...RoundedQuickLinkIcon}
                  className="bg-coinclustr-purple bg-opacity-20 rounded-full mr-2"
                >
                  <BitcoinIcon />
                </i>
                Pay a friend
              </CustomCard>
            </Link>
          </div>
          {/* <div className="w-full md:w-auto mr-4 mb-4">
            <Link to="/wallets" className="quick-link-item">
              <CustomCard>
                <i
                  {...RoundedQuickLinkIcon}
                  className="bg-coinclustr-green bg-opacity-20 rounded-full mr-2"
                >
                  <WalletIcon />
                </i>
                Sync your wallet
              </CustomCard>
            </Link>
          </div> */}
          {/* <div className="w-full md:w-auto mr-4">
            <Link to="/wallets" className="quick-link-item">
              <CustomCard>
                <i
                  {...RoundedQuickLinkIcon}
                  className="bg-coinclustr-dark-blue bg-opacity-20 rounded-full mr-2"
                >
                  <CreateAWidgetIcon />
                </i>
                Create widget
              </CustomCard>
            </Link>
          </div> */}
        </div>
      </div>

      <H3>Dashboard</H3>
      <DashboardWrapper className="w-full flex items-start justify-between mb-6">
        <PorfolioCard
          data={builtInWallet}
          isFetching={isFetchingBuiltInWallet}
        />
        <MarketsChartCard />
        <div {...StatictisStyles}>
          <Link to="/invoices?status=completed" className="block mb-4">
            <CustomCard>
              <div className="flex mr-3">
                <i
                  {...RoundedInvoiceIconStyles}
                  className="bg-coinclustr-green bg-opacity-20 rounded-full"
                >
                  <FileCheckedIcon />
                </i>
              </div>
              <div className="w-full">
                <Label className="text-coinclustr-gray-60 text-xl block">
                  {contentLoading ? "0" : complete}
                </Label>
                <Label className="text-coinclustr-gray-40">
                  Completed
                  <br />
                  Invoices
                </Label>
              </div>
              <RightOutlined className="text-coinclustr-gray-60" />
            </CustomCard>
          </Link>
          <Link to="/invoices?status=open" className="block mb-4">
            <CustomCard>
              <div className="flex mr-3">
                <i
                  {...RoundedInvoiceIconStyles}
                  className="bg-coinclustr-yellow bg-opacity-20 rounded-full"
                >
                  <FileIcon />
                </i>
              </div>
              <div className="w-full">
                <Label className="text-coinclustr-gray-60 text-xl block">
                  {contentLoading ? "0" : open}
                </Label>
                <Label className="text-coinclustr-gray-40">
                  Open
                  <br />
                  Invoices
                </Label>
              </div>
              <RightOutlined className="text-coinclustr-gray-60" />
            </CustomCard>
          </Link>
          <Link to="/invoices?status=underpaid" className="block mb-4">
            <CustomCard>
              <div className="flex mr-3">
                <i
                  {...RoundedInvoiceIconStyles}
                  className="bg-coinclustr-red bg-opacity-20 rounded-full"
                >
                  <FolderDeleteIcon />
                </i>
              </div>
              <div className="w-full">
                <Label className="text-coinclustr-gray-60 text-xl block">
                  {contentLoading ? "0" : underpaid}
                </Label>
                <Label className="text-coinclustr-gray-40">
                  Underpaid
                  <br />
                  Invoices
                </Label>
              </div>
              <RightOutlined className="text-coinclustr-gray-60" />
            </CustomCard>
          </Link>
        </div>
      </DashboardWrapper>
      {/* <div className="w-full">
        <H3>Widget</H3>
        <div className="widget-content">
          <Paragraph>Information about how to use it.</Paragraph>
          <Link to="/widgets">
            <CustomButton
              type="primary"
              size="large"
              className="text-uppercase"
            >
              Create widget
            </CustomButton>
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
