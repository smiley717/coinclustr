import React, { useEffect, useState, memo } from "react";
import { Layout } from "antd";
import { useRecoilState } from "recoil";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { REDIRECT_URL } from "utils/Constant";

import TopNavigation from "./TopNavigation";
import { maskVisibleState } from "recoil/mask";
import {
  notificationState,
  userDataState,
  profileDataState,
  settingsDateState,
} from "recoil/user";
import { isEmpty } from "utils/common-utils";
import decode from "jwt-decode";
import {
  GetUserProfile,
  GetAccountInformation,
  GetCustomerSettings,
} from "services/CustomerService";
import { GetAllNotifications } from "services/NotificationServices";

const { Content } = Layout;

const LayoutFrame = ({ children, location }) => {
  const [maskVisible, setMaskVisible] = useRecoilState(maskVisibleState);
  const [userState, setUserState] = useRecoilState(userDataState);
  const [profileState, setProfileState] = useRecoilState(profileDataState);
  const [preparingData, setPreparingData] = useState(true);
  const [settingsState, setSettingsState] = useRecoilState(settingsDateState);
  const [notification, setNotification] = useRecoilState(notificationState);

  useEffect(() => {
    setMaskVisible(false);
    
    const token = Cookies.get("token") || "";
    // if the token is empty, reject the access
    if (isEmpty(token) || 
    Date.now() >= decode(token).exp * 1000) {
      console.log(REDIRECT_URL);
      // window.location.replace(REDIRECT_URL);
    } 
    if (
      isEmpty(profileState) ||
      isEmpty(settingsState) ||
      isEmpty(notificationState)
    ) {
      async function prepareData() {
        try {

          // get the profile of user
          const userProfile = await GetUserProfile();
          setProfileState(userProfile.data);

          const notificationData = await GetAllNotifications();
          setNotification(notificationData.data);

          const settingInfo = await GetCustomerSettings();
          setSettingsState(settingInfo.data);

          setPreparingData(false);
        } catch (error) {
          console.log(error);
          setPreparingData(false);
        }
      }
      // execute the function
      // ? for mock data, we need to delay this action to make sure the cookies for token has been set
      setTimeout(() => {
        prepareData();
      }, 2000);
    } else {
      setPreparingData(false);
    }
  }, [
    location,
    setMaskVisible,
    userState,
    profileState,
    setUserState,
    setProfileState,
  ]);

  return (
    <Layout style={{ backgroundColor: "#F5F7FA" }}>
      {process.env.NODE_ENV !== "production" && (
        <div
          title="Breakpoint Indicator"
          className="fixed z-10 bottom-0 right-0 m-8 p-3 text-xs font-mono text-white h-10 w-10 rounded-full flex items-center justify-center bg-gray-700 sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500"
        >
          <div className="block sm:hidden md:hidden lg:hidden xl:hidden">
            al
          </div>
          <div className="hidden sm:block  md:hidden lg:hidden xl:hidden">
            sm
          </div>
          <div className="hidden sm:hidden md:block  lg:hidden xl:hidden">
            md
          </div>
          <div className="hidden sm:hidden md:hidden lg:block  xl:hidden">
            lg
          </div>
          <div className="hidden sm:hidden md:hidden lg:hidden xl:block">
            xl
          </div>
        </div>
      )}

      <TopNavigation />
      <Content
        style={{ position: "relative", minHeight: "calc(100vh - 65px)" }}
      >
        {!preparingData ? (
          <div>
            {children}
            {maskVisible && <div className="mask"></div>}
          </div>
        ) : null}
      </Content>
    </Layout>
  );
};

export default withRouter(memo(LayoutFrame));
