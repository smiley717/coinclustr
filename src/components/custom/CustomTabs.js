import React from "react";
import styled from "styled-components";
import { Space, Tabs } from "antd";

const CustomTabsStyled = styled(Tabs)`
  .ant-tabs-content-holder {
    display: none;
  }
  .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    height: 3px;
    border-radius: 10px;
  }
  .ant-tabs-nav {
    margin: 0;
    :before {
      border: none;
    }
    
    .ant-tabs-tab {
      padding: 0;
      width: 100%;
      margin: 0;
      .ant-tabs-tab-btn {
        width: 100%;
      }
    }
  }
`;

export const CustomTabs = (props) => {
  return <CustomTabsStyled {...props}></CustomTabsStyled>;
};

const { TabPane } = Tabs;
const CustomTabPaneStyled = styled(TabPane)`
  .ant-tabs-tab {
    padding: 0 !important;
  }
`;

export const CustomTabPane = (props) => {
  return <CustomTabPaneStyled {...props}></CustomTabPaneStyled>;
};

const CustomTabWrapperStyled = styled(Space)`
  .ant-tabs {
    margin-bottom: 24px !important;
    margin-top: 32px !important;
  }
  .ant-tabs-nav-list {
    width: 504px;
    display: grid !important;
    grid-template-columns: 1fr 1fr;
  }
`
export const CustomTabWrapper = (props) => <CustomTabWrapperStyled {...props} />