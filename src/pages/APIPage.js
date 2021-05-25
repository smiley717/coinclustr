import React, { useEffect, useState } from "react";
import { Row, Col, Input, Divider, message, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { css } from "glamor";
import SyntaxHighlighter from "react-syntax-highlighter";
import get from "lodash/get";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { H3, Label, Subtitle } from "styled/Typography";
import WalletTabList from "pages/Wallet/WalletTabList";
import CollapseCard from "./API/CollapseCard";
import { GetSyncWallet } from "services/WalletServices";
import { GetBuiltInWallets } from "services/WalletServices";

import { ReactComponent as APIOpener } from "img/icons/api-opener.svg";
import { ReactComponent as CopyIcon } from "img/icons/copy.svg";
import { copyIntoClipboard } from "utils/common-utils";

const searchStyling = css({
  fontSize: "18px",
});

const APIPage = () => {
  const [synchedWalletData, setSynchedWalletData] = useState([]);
  const [builtInWalletData, setBuiltInWalletData] = useState([]);
  const [isWalletFetching, setIsWalletFetching] = useState(true);
  const [currentSelectedWalletData, setCurrentSelectedWalletData] = useState(
    ""
  );

  const onSelectWallet = (walletId) => {
    setCurrentSelectedWalletData(walletId);
  };

  useEffect(() => {
    // GetCustomerWallets is getting builtin wallet
    // GetAllWallets is getting synched wallet
    Promise.allSettled([GetBuiltInWallets(), GetSyncWallet()])
      .then((res) => {
        if (res[0].status === "fulfilled") {
          setBuiltInWalletData(get(res, "[0].value.data", ""));
        }
        if (res[1].status === "fulfilled") {
          setSynchedWalletData(get(res, "[1].value.data", ""));
        }
        setIsWalletFetching(false);
      })
      .catch(() => {
        message.error("Error when fetch data");
        setIsWalletFetching(false);
      });
  }, []);

  return (
    <div
      className="container mx-auto"
      style={{ marginTop: "32px", marginBottom: "32px" }}
    >
      <Row gutter="16" className="mb-2">
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <H3>APIs</H3>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="flex justify-start md:justify-end items-center">
            <a
              href="http://api.coinclustr.com/docs"
              className="flex items-center"
            >
              <APIOpener />
              <Label className="ml-2">API documentation</Label>
              <SearchOutlined className="ml-4" {...searchStyling} />
            </a>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          {isWalletFetching ? (
            <Skeleton />
          ) : (
            <WalletTabList
              synchedWalletData={synchedWalletData}
              builtInWalletData={builtInWalletData}
              currentSelectedWalletData={currentSelectedWalletData}
              onSelectWallet={onSelectWallet}
            />
          )}
        </Col>
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <CollapseCard
            title="Test API Key"
            subtitle="Text about what API keyTest is."
          >
            <Row gutter={16} className="mb-2">
              <Col span={5} className="text-right">
                <Label>Publishable key</Label>
              </Col>
              <Col span={19}>
                <Input
                  className="empty-addon-after w-6/12"
                  placeholder="Amount Due"
                  value="abc"
                  addonAfter={
                    <CopyIcon
                      className="cursor-pointer"
                      onClick={() => copyIntoClipboard("abc")}
                    />
                  }
                />
              </Col>
            </Row>
            <Row gutter={16} className="mb-2">
              <Col span={5} className="text-right">
                <Label>Secret key</Label>
              </Col>
              <Col span={19}>
                <Input.Password
                  className="empty-addon-after w-4/12"
                  placeholder="Amount Due"
                  value="abc"
                />
              </Col>
            </Row>
          </CollapseCard>
          <CollapseCard title="Dynamic invoices" subtitle="">
            <Row gutter={16} className="mb-2">
              <Col span={24}>
                <Subtitle className="block mb-2">
                  You can use our API to create payment solutions. Create
                  Invoices to accept payments from client. Track the status of
                  the payments through api, webhooks or streams.
                </Subtitle>
                <Subtitle className="block mb-2">
                  We have language bindings in Shell, and JavaScript! You can
                  view code examples in the dark area to the right, and you can
                  switch the programming language of the examples with the tabs
                  in the top right.
                </Subtitle>
              </Col>
            </Row>
          </CollapseCard>
          <CollapseCard
            title="Analytics"
            subtitle="Text about what Analytics is."
          >
            <Row gutter={16} className="mb-2">
              <Col span={24} className="mb-8">
                <H3 className="block">real API</H3>
                <Row gutter={16}>
                  <Col span={20}>
                    <Subtitle>6 hours and more to complete invoice</Subtitle>
                  </Col>
                  <Col span={4} className="flex justify-end items-center">
                    <Subtitle className="pr-2">16</Subtitle>
                  </Col>
                </Row>
                <Divider className="p-0 mx-0 my-2" />
                <Row gutter={16}>
                  <Col span={20}>
                    <Subtitle>number of failed transactions</Subtitle>
                  </Col>
                  <Col span={4} className="flex justify-end items-center">
                    <Subtitle className="pr-2">32</Subtitle>
                  </Col>
                </Row>
                <Divider className="p-0 mx-0 my-2" />
                <Row gutter={16}>
                  <Col span={20}>
                    <Subtitle>call information on</Subtitle>
                  </Col>
                  <Col span={4} className="flex justify-end items-center">
                    <Subtitle className="pr-2">0</Subtitle>
                  </Col>
                </Row>
                <Divider className="p-0 mx-0 my-2" />
              </Col>
              <Col span={24} className="mb-8">
                <H3 className="block">test API</H3>
                <Row gutter={16}>
                  <Col span={20}>
                    <Subtitle>6 hours and more to complete invoice</Subtitle>
                  </Col>
                  <Col span={4} className="flex justify-end items-center">
                    <Subtitle className="pr-2">16</Subtitle>
                  </Col>
                </Row>
                <Divider className="p-0 mx-0 my-2" />
                <Row gutter={16}>
                  <Col span={20}>
                    <Subtitle>number of failed transactions</Subtitle>
                  </Col>
                  <Col span={4} className="flex justify-end items-center">
                    <Subtitle className="pr-2">32</Subtitle>
                  </Col>
                </Row>
                <Divider className="p-0 mx-0 my-2" />
                <Row gutter={16}>
                  <Col span={20}>
                    <Subtitle>call information on</Subtitle>
                  </Col>
                  <Col span={4} className="flex justify-end items-center">
                    <Subtitle className="pr-2">0</Subtitle>
                  </Col>
                </Row>
                <Divider className="p-0 mx-0 my-2" />
              </Col>
              <Col span={24}>
                <H3 className="block">Fraud</H3>
                <Row gutter={16}>
                  <Col span={20}>
                    <Subtitle>6 hours and more to complete invoice</Subtitle>
                  </Col>
                  <Col span={4} className="flex justify-end items-center">
                    <Subtitle className="pr-2">11</Subtitle>
                  </Col>
                </Row>
                <Divider className="p-0 mx-0 my-2" />
              </Col>
            </Row>
          </CollapseCard>
          <CollapseCard title="Widget" subtitle="Text about what widget is">
            <Row gutter={16} className="mb-2">
              <Col span={18}>
                <SyntaxHighlighter
                  className="w-full"
                  language="javascript"
                  style={atomOneLight}
                >{`
{
  "status": {
    "timestamp": "2018-06-02T22:51:28.209Z",
    "elapsed": 10
  },
  "data": {
    "id": "1e31218a-e44e-4285-820c-8282ee222035",
    "symbol": "BTC",
    "name": "Bitcoin",
    "slug": "bitcoin",
    "market_data": {
      "price_usd": 7184.79746667989,
      "price_btc": 1,
      "volume_last_24_hours": 3686422132.4061913,
    }
  }
}
              `}</SyntaxHighlighter>
              </Col>
            </Row>
          </CollapseCard>
        </Col>
      </Row>
    </div>
  );
};

export default APIPage;
