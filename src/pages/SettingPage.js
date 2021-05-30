import React, { useState, useEffect } from "react";
import {Col, Menu, Row} from "antd";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { withRouter } from "react-router";
import { css } from "glamor";

import SettingProfilePage from "./Setting/SettingProfilePage";
import SettingSecurityPage from "./Setting/SettingSecurityPage";
import SettingBillingPage from "./Setting/SettingBillingPage";

import { H3 } from "../styled/Typography";
import theme from "../utils/theme";

const fullTabMenuStyles = css({
  width: "100%",
  background: "no-repeat",
  display: "flex",
  justifyContent: "center",
  "& .ant-menu-item": {
    padding: "0px 12px!important",
    flex: "1",
    display: "flex",
    justifyContent: "center",
  },
  "& .ant-menu-item a": {
    color: theme.colors.gray40,
  },
  "& .ant-menu-item-selected a": {
    color: theme.colors.gray80 + "!important",
  },
});

const SettingPage = (props) => {
  // const [profile, setProfile] = useState(JSON.parse(Cookies.get("userData")));
  const [currentTab, setCurrentTab] = useState("profile");
  const { path, url } = useRouteMatch();
  const { pathname } = props.location;

  const handleClickChangeCurrentKey = () => {};

  useEffect(() => {
    switch (pathname) {
      case "/settings/profile":
        setCurrentTab("profile");
        break;
      case "/settings/security":
        setCurrentTab("security");
        break;
      case "/settings/billing":
        setCurrentTab("billing");
        break;
      default:
        setCurrentTab("profile");
        break;
    }
  }, [pathname]);

  const generateScreens = () => {
    switch (pathname) {
      case "/settings/profile":
        return <SettingProfilePage />;
      case "/settings/security":
        return <SettingSecurityPage />;
      case "/settings/billing":
        return <SettingBillingPage />;
      default:
        return <SettingProfilePage />;
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex items-center justify-start mb-10">
        <Row className="w-full">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <H3 className="m-0">Settings</H3>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <Menu
              mode="horizontal"
              onClick={handleClickChangeCurrentKey}
              selectedKeys={[currentTab]}
              {...fullTabMenuStyles}
            >
              <Menu.Item key="profile">
                <Link to={`${url}/profile`}>Profile</Link>
              </Menu.Item>
              <Menu.Item key="security" onClick={() => setCurrentTab("security")}>
                <Link to={`${url}/security`}>Security</Link>
              </Menu.Item>
              <Menu.Item key="billing" onClick={() => setCurrentTab("billing")}>
                <Link to={`${url}/billing`}>Billing</Link>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </div>
      <Switch>
        <Route path={`${path}/:screenName`}>{generateScreens()}</Route>
      </Switch>
    </div>
  );
};

export default withRouter(SettingPage);
