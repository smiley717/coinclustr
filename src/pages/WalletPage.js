import React, { useState, useEffect } from "react";
import { Row, Col, Skeleton, message, Drawer } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { css } from "glamor";
import { get } from "lodash";

import { H4, H3, Label, LabelLarge } from "../styled/Typography";
import CustomCard from "../styled/CustomCard";

import theme from "../utils/theme";
import ExpandWalletCard from "./Wallet/ExpandWalletCard";
import {
  GetSyncWallet,
  ListAllWidgetForSingleWallet,
} from "../services/WalletServices";
import { GetBuiltInWallets } from "../services/WalletServices";
import { isEmpty } from "utils/common-utils";
import RecentEarningChart from "../components/RecentEarningChart";

import { ReactComponent as WalletFlatIcon } from "../img/icons/wallet-flat.svg";
import { ReactComponent as BluePlusIcon } from "../img/icons/blue-plus.svg";
import WalletTabList from "./Wallet/WalletTabList";

const widgetSmallCardIcon = css({
  position: "absolute",
  top: "16px",
  right: "16px",
  cursor: "pointer",
});

const WalletPage = () => {
  const [synchedWalletData, setSynchedWalletData] = useState([]);
  const [builtInWalletData, setBuiltInWalletData] = useState([]);
  const [widgetList, setWidgetList] = useState([]);
  const [isWalletFetching, setIsWalletFetching] = useState(true);
  const [isWidgetFetching, setIsWidgetFetching] = useState(true);
  const [currentSelectedWalletData, setCurrentSelectedWalletData] = useState(
    ""
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window?.innerWidth > 768 && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    });
  }, [isDrawerOpen]);

  useEffect(() => {
    // GetCustomerWallets is getting builtin wallet
    // GetAllWallets is getting synched wallet
    Promise.allSettled([GetBuiltInWallets()])
      .then((res) => {
        if (res[0].status === "fulfilled") {
          setBuiltInWalletData(get(res, "[0].value.data", ""));
        }
        // if (res[1].status === "fulfilled") {
        //   setSynchedWalletData(get(res, "[1].value.data", ""));
        // }
        setIsWalletFetching(false);
      })
      .catch(() => {
        message.error("Error when fetch data");
        setIsWalletFetching(false);
      });
  }, []);

  // useEffect(() => {
    // if (!isEmpty(currentSelectedWalletData)) {
    //   ListAllWidgetForSingleWallet(currentSelectedWalletData)
    //     .then((res) => {
    //       setWidgetList(get(res, "data", []));
    //       setIsWidgetFetching(false);
    //     })
    //     .catch(() => {
    //       message.error("Error when fetch list widget of selected wallet");
    //       setIsWidgetFetching(false);
    //     });
    // }
  // }, [currentSelectedWalletData]);

  const DetailSelectWalletContent = (view) => {
    return (
      <>
        <ExpandWalletCard
          selectedWallet={currentSelectedWalletData}
          view={view}
        />
        <Row className="dashboard-content justify-between mt-8">
          <RecentEarningChart />
        </Row>
        <Row gutter={16} className="mt-8">
          <Col span={8}>
            {/* {!isEmpty(currentSelectedWalletData) ? (
              isWidgetFetching ? (
                <Skeleton />
              ) : (
                widgetList.map((item) => {
                  const { id, widgetName, completedInvoices = 0 } = item;
                  return (
                    <Link
                      key={id}
                      to={`/wallet/${currentSelectedWalletData}/widget/${id}`}
                    >
                      <CustomCard display="block">
                        <RightOutlined {...widgetSmallCardIcon} />
                        <LabelLarge className="block text-left">
                          {widgetName}
                        </LabelLarge>
                        <Label className="block text-left">
                          {`${completedInvoices} completed invoices`}
                        </Label>
                      </CustomCard>
                    </Link>
                  );
                })
              )
            ) : null} */}
          </Col>
        </Row>
      </>
    );
  };

  const onSelectWallet = (walletId) => {
    setCurrentSelectedWalletData(walletId);
    if (window.innerWidth <= 768) {
      setIsDrawerOpen(true);
    }
  };

  if (isWalletFetching) {
    return (
      <div className="container mx-auto my-8">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8">
      <Row gutter="16">
        <Col span={12}>
          <H3>Wallets</H3>
        </Col>
        {/*<Col span={12}>*/}
        {/*  <div className="flex justify-end items-center w-full">*/}
        {/*    <Link to="/wallet/sync" className="flex items-center">*/}
        {/*      <BluePlusIcon />*/}
        {/*      <Label className="ml-2">Sync wallet</Label>*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*</Col>*/}
      </Row>
      <Row gutter= {16} className="mt-4">
        {isEmpty(synchedWalletData) && isEmpty(builtInWalletData) ? (
          <Col span={24}>
            <CustomCard
              display="flex"
              justifycontent="center"
              className="py-18 flex justify-center items-center"
            >
              <div className="text-center">
                <WalletFlatIcon />
                <H4>No Wallets Yet</H4>
              </div>
            </CustomCard>
          </Col>
        ) : (
          <>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <WalletTabList
                synchedWalletData={synchedWalletData}
                builtInWalletData={builtInWalletData}
                currentSelectedWalletData={currentSelectedWalletData}
                onSelectWallet={onSelectWallet}
              />
            </Col>
            <Col xs={0} sm={0} md={18} lg={18} xl={18}>
              {DetailSelectWalletContent("desktop")}
            </Col>
            <Drawer
              placement="bottom"
              closable={false}
              visible={isDrawerOpen}
              destroyOnClose={true}
              onClose={() => setIsDrawerOpen(false)}
              height="calc(100vh - 65px)"
              keyboard={false}
              maskClosable={false}
              maskStyle={{ opacity: 0 }}
              drawerStyle={{ backgroundColor: "#F5F7FA" }}
            >
              <>
                <Row gutter={16}>
                  <Col span={24}>
                    <div
                      className="w-full flex justify-start items-center mb-4"
                      onClick={() => {
                        setIsDrawerOpen(false);
                        setCurrentSelectedWalletData("");
                      }}
                    >
                      <LeftOutlined style={{ color: theme.colors.gray50 }} />
                      <LabelLarge className="ml-4">
                        Back to the previous page
                      </LabelLarge>
                    </div>
                  </Col>
                </Row>
                {DetailSelectWalletContent("mobile")}
              </>
            </Drawer>
          </>
        )}
      </Row>
    </div>
  );
};

export default WalletPage;
