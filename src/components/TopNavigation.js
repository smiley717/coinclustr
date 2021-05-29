import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Divider, Skeleton, Button, Badge } from "antd";
import { withRouter, matchPath } from "react-router";
import get from "lodash/get";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

import { CustomerLogout } from "../services/CustomerService";
import { BodyText, Subtitle, Label } from "../styled/Typography";

import { maskVisibleState } from "../recoil/mask";
import { profileDataState } from "../recoil/user";
import MobileNavigation from "./MobileNavigation";
import { useRecoilState } from "recoil";

import { ReactComponent as MainLogo } from "../img/logo.svg";
import { ReactComponent as BellIcon } from "../img/icons/bell.svg";
import { ReactComponent as QuestionCircleIcon } from "../img/icons/question-circle.svg";
import { ReactComponent as UserIcon } from "../img/icons/user.svg";
import { ReactComponent as SettingIcon } from "../img/icons/settings-icon.svg";
import { ReactComponent as LogoutIcon } from "../img/icons/logout-icon.svg";
import { ReactComponent as APIDocumentationIcon } from "../img/icons/api-documentation-icon.svg";
import { ReactComponent as FAQIcon } from "../img/icons/faq-icon.svg";
import { ReactComponent as ContactUsFormIcon } from "../img/icons/contact-us-form-icon.svg";
import { LogoWrapper } from "styled/LogoWrapper";
import { notificationState } from "recoil/user";
import { REDIRECT_URL } from "utils/Constant";

const TopNavigation = (props) => {
  const [, setMaskVisible] = useRecoilState(maskVisibleState);
  const [profileState] = useRecoilState(profileDataState);
  const [currentKey, setCurrentKey] = useState("home");
  const [isMenuShow, setMenuShow] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(true);
  const [notification, setNotification] = useRecoilState(notificationState);

  const toggle = () => setMenuShow(!isMenuShow);

  const handleClickChangeCurrentKey = () => { };

  const showMask = () => {
    setMaskVisible(true);
  };

  const dropDownSettingsMenu = (
    <Menu className="bg-white rounded-lg border-none p-4">
      <Menu.Item className="flex flex-col">
        <Subtitle className="text-coinclustr-gray-50">
          {get(profileState, "fullname", "")}
        </Subtitle>
        <BodyText className="text-coinclustr-gray-30">
          {get(profileState, "email", "")}
        </BodyText>
      </Menu.Item>
      <Divider className="my-3" />
      <Menu.Item>
        <Link to="/settings/profile" className="flex items-center">
          <SettingIcon className="mr-3" />
          <Label className="text-coinclustr-gray-60">Settings</Label>
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => logout()} className="flex items-center">
        <LogoutIcon className="mr-3" />
        <Label className="text-coinclustr-gray-60">Logout</Label>
      </Menu.Item>
    </Menu>
  );

  const dropdownHelpMenu = (
    <Menu className="bg-white rounded-lg border-none p-4">
      <Menu.Item>
        <Link to="/" className="flex items-center">
          <APIDocumentationIcon className="mr-3" />
          <Label className="text-coinclustr-gray-60">API documentation</Label>
        </Link>
      </Menu.Item>
      <Divider className="my-1" />
      <Menu.Item className="flex items-center">
        <FAQIcon className="mr-3" />
        <Label className="text-coinclustr-gray-60">FAQ form</Label>
      </Menu.Item>
      <Divider className="my-1" />
      <Menu.Item className="flex items-center">
        <ContactUsFormIcon className="mr-3" />
        <Label className="text-coinclustr-gray-60">Contact us form</Label>
      </Menu.Item>
    </Menu>
  );

  const notificationMenu = (
    <Menu
      className="bg-white rounded-lg border-none p-3"
      style={{ width: "285px" }}
    >
      {notificationLoading ? (
        <Skeleton active />
      ) : (
        <Menu.Item>
          <div className="flex flex-col flex-wrap">
            <Label className="text-coinclustr-gray-80 font-semibold block mb-1">
              Invoice updated
            </Label>
            <BodyText
              className="text-coinclustr-gray-80 block w-full"
              style={{ whiteSpace: "pre-wrap" }}
            >
              Received from Test User. Amount 0.0001 BTC. Completed status.
            </BodyText>
          </div>
        </Menu.Item>
      )}
      <Divider className="my-1" />
      <Menu.Item className="flex items-center justify-center">
        <Link to="/notifications">
          <Button type="link" className="uppercase">
            See all notifications
          </Button>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const generateCurrentStateNavigation = (pathname) => {
    switch (pathname) {
      case "/":
        setCurrentKey("home");
        break;
      case "/wallets":
        setCurrentKey("wallets");
        break;
      case "/wallets/sync":
        setCurrentKey("wallets");
        break;
      case "/invoices":
        setCurrentKey("invoices");
        break;
      case "/invoices/create":
        setCurrentKey("invoices");
        break;
      case "/payments":
      case "/payments/create":
        setCurrentKey("payments");
        break;
      case "/wallets/create":
        setCurrentKey("wallets");
        break;
      case "/apis":
        setCurrentKey("apis");
        break;
      default:
        setCurrentKey("home");
        break;
    }
  };

  const goToPage = (pathname) => {
    props.history.push(`/${pathname}`);
  };

  const logout = () => {
    CustomerLogout()
      .then((res) => {
        console.log(res);
        Cookies.remove("token");
        Cookies.remove("userData");
      })
      .catch((err) => {
        console.log(err);
      });
      window.location.replace(REDIRECT_URL);
  };

  useEffect(() => {
    // TODO: remove the dummy effect if not needed
    setTimeout(() => {
      setNotificationLoading(false);
    }, 2000);
    const matchViewWidgetPath = matchPath(props.history.location.pathname, {
      path: "/wallets/:walletid/widget/:widgetid",
      exact: true,
      strict: false,
    });
    const matchCreateWidgetPath = matchPath(props.history.location.pathname, {
      path: "/wallets/:walletid/widget/create",
      exact: true,
      strict: false,
    });
    const matchTopupsHistoryPath = matchPath(props.history.location.pathname, {
      path: "/wallet/:walletid/topups",
      exact: true,
      strict: false,
    });
    const matchEditWidgetPath = matchPath(props.history.location.pathname, {
      path: "/wallets/:walletid/widget/:widgetid/edit",
      exact: true,
      strict: false,
    });
    if (
      get(matchViewWidgetPath, "params.walletid", null) ||
      get(matchCreateWidgetPath, "params.walletid", null) ||
      get(matchEditWidgetPath, "params.walletid", null) ||
      get(matchTopupsHistoryPath, "params.walletid", null)

    ) {
      setCurrentKey("wallets");
    } else {
      generateCurrentStateNavigation(props.location.pathname);
    }
  }, [props.location, props.history.location.pathname]);

  return (
    <div className="bg-white border border-b-1 border-coinclustr-gray-bordered">
      <div className="container mx-auto relative">
        <div className="flex items-center">
          <div className="w-6/12 sm:w-6/12 md:w-2/12">
            <div className="flex w-full h-full justify-start items-center">
              <LogoWrapper onClick={() => goToPage("")}>
                <MainLogo />
              </LogoWrapper>
            </div>
          </div>
          <div
            className={`hidden sm:hidden md:flex justify-center items-center w-8/12`}
          >
            <Menu
              mode="horizontal"
              onClick={handleClickChangeCurrentKey}
              selectedKeys={[currentKey]}
            >
              <Menu.Item
                className="py-3 px-4"
                onClick={() => goToPage("")}
                key="home"
              >
                <BodyText
                  className={currentKey === "home" && "text-coinclustr-gray-80"}
                >
                  Home
                </BodyText>
              </Menu.Item>
              <Menu.Item
                className="py-3 px-4"
                onClick={() => goToPage("wallets")}
                key="wallets"
              >
                <BodyText
                  className={
                    currentKey === "wallets" && "text-coinclustr-gray-80"
                  }
                >
                  Wallets
                </BodyText>
              </Menu.Item>
              <Menu.Item
                className="py-3 px-4"
                onClick={() => goToPage("invoices")}
                key="invoices"
              >
                <BodyText
                  className={
                    currentKey === "invoices" && "text-coinclustr-gray-80"
                  }
                >
                  Invoices
                </BodyText>
              </Menu.Item>
              <Menu.Item
                className="py-3 px-4"
                onClick={() => goToPage("payments")}
                key="payments"
              >
                <BodyText
                  className={
                    currentKey === "payments" && "text-coinclustr-gray-80"
                  }
                >
                  Payments
                </BodyText>
              </Menu.Item>
              {/* <CustomMenuItem
                onClick={() => redirect("api")}
                minheight={minHeightNavigation}
                key="api"
              >
                API
              </CustomMenuItem> */}
            </Menu>
          </div>
          <div className="flex sm:flex md:hidden w-6/12 justify-end">
            <MenuOutlined className="hamburger-menu" onClick={toggle} />
          </div>
          <div className="w-2/12 hidden sm:hidden md:block">
            <div className="flex flex-row items-center justify-end">
              <Dropdown
                placement="bottomRight"
                overlay={notificationMenu}
                trigger={["click"]}
                onClick={showMask}
                onVisibleChange={(visible) => {
                  if (!visible) {
                    setMaskVisible(false);
                  }
                }}
                className="ml-4 cursor-pointer"
              >
                <Badge count={notification.unreadCount} placement="start">
                  <BellIcon className="ml-4 cursor-pointer" />
                </Badge>
              </Dropdown>
              <Dropdown
                placement="bottomRight"
                overlay={dropdownHelpMenu}
                trigger={["click"]}
                onClick={showMask}
                onVisibleChange={(visible) => {
                  if (!visible) {
                    setMaskVisible(false);
                  }
                }}
                className="ml-4 cursor-pointer"
              >
                <QuestionCircleIcon className="ml-4 cursor-pointer" />
              </Dropdown>
              <Dropdown
                placement="bottomRight"
                overlay={dropDownSettingsMenu}
                trigger={["click"]}
                onClick={showMask}
                onVisibleChange={(visible) => {
                  if (!visible) {
                    setMaskVisible(false);
                  }
                }}
                className="ml-4 cursor-pointer"
              >
                <UserIcon />
              </Dropdown>
            </div>
          </div>
          {isMenuShow && (
            <MobileNavigation
              closeMobileNavigation={() => setMenuShow(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(TopNavigation);
