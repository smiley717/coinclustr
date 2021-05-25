import React, { useState } from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

import { CustomMenuItem } from "../styled/CustomMenu";
import { redirect } from "utils/common-utils";

import { ReactComponent as MainLogo } from "../img/logo.svg";

export const minHeightNavigation = 64;

const MobileNavigation = (props) => {
  const [currentKey] = useState("home");

  const handleClickChangeCurrentKey = () => {};

  const goToPage = (pathname) => {
    props.history.push(`/${pathname}`);
  };

  const { closeMobileNavigation } = props;

  return (
    <div className="absolute w-full top-0 left-0 z-10">
      <div className="container flex items-start mx-auto bg-white py-8">
        <div className="w-5/12 h-full justify-start items-center">
          <span onClick={() => goToPage("")}>
            <MainLogo />
          </span>
        </div>
        <div className="w-7/12">
          <Menu
            onClick={handleClickChangeCurrentKey}
            selectedKeys={[currentKey]}
            style={{ border: "none" }}
            className="flex flex-col border-none"
          >
            <CustomMenuItem
              onClick={() => {
                goToPage("");
                closeMobileNavigation();
              }}
              minheight={minHeightNavigation}
              key="home"
              className="flex justify-start"
            >
              Home
            </CustomMenuItem>
            <CustomMenuItem
              onClick={() => {
                goToPage("wallet");
                closeMobileNavigation();
              }}
              minheight={minHeightNavigation}
              key="wallet"
              className="flex justify-start"
            >
              Wallets
            </CustomMenuItem>
            <CustomMenuItem
              onClick={() => {
                goToPage("invoice");
                closeMobileNavigation();
              }}
              minheight={minHeightNavigation}
              key="invoice"
              className="flex justify-start"
            >
              Invoices
            </CustomMenuItem>
            <CustomMenuItem
              onClick={() => {
                goToPage("payment");
                closeMobileNavigation();
              }}
              minheight={minHeightNavigation}
              key="payment"
              className="flex justify-start"
            >
              Payments
            </CustomMenuItem>
            <CustomMenuItem
              onClick={() => redirect("api")}
              minheight={minHeightNavigation}
              key="api"
              className="flex justify-start"
            >
              API
            </CustomMenuItem>
            <CustomMenuItem
              onClick={() => {
                goToPage("notification");
                closeMobileNavigation();
              }}
              minheight={minHeightNavigation}
              key="payment"
              className="flex justify-start"
            >
              Notification
            </CustomMenuItem>
            <CustomMenuItem
              onClick={() => {
                goToPage("settings/profile");
                closeMobileNavigation();
              }}
              minheight={minHeightNavigation}
              key="payment"
              className="flex justify-start"
            >
              Settings
            </CustomMenuItem>
            <CustomMenuItem
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("userData");
                window.location.href = "/";
              }}
              minheight={minHeightNavigation}
              key="payment"
              className="flex justify-start"
            >
              Log Out
            </CustomMenuItem>
          </Menu>
        </div>
      </div>
      <div className="container mx-auto bg-white py-6">
        <div className="flex justify-end items-center">
          <CloseOutlined onClick={() => props.closeMobileNavigation()} />
        </div>
      </div>
    </div>
  );
};

export default withRouter(MobileNavigation);
