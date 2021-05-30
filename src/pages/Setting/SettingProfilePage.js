import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useRecoilState } from "recoil";
import get from "lodash/get";
import Cookies from "js-cookie";

import { H3, Subtitle } from "styled/Typography";
import CustomButton from "styled/CustomButton";

import SubscriptionSection from "components/pages/Settings/SubscriptionSection";
import PlanDetailSection from "components/pages/Settings/PlanDetailSection";
import ProfileDetailSettingsSection from "components/pages/Settings/ProfileDetailSettingsSection";
import NotificationSection from "components/pages/Settings/NotificationSection";
import {
  EditProfileModal,
  UpgradePlanModal,
  DownGradePlanModal,
  AddPaymentMethodModal,
} from "components/modal";

import { userDataState, profileDataState } from "recoil/user";

import { GetUserProfile, DeactiveUserProfile } from "services/CustomerService";
import {css} from "glamor";

const settingPlanStyling = css({
  "@media (max-width: 768px)": {
    flexDirection: 'column-reverse',
    " .subscription-section": {
      display: 'flex',
      minWidth: '100%',
    }
  },
});

const SettingProfilePage = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [userState] = useRecoilState(userDataState);
  const [profileState, setProfileState] = useRecoilState(profileDataState);
  const [upgradePlanModalVisible, setUpgradePlanModalVisible] = useState(false);
  const [downgradePlanModalVisible, setDowngradePlanModalVisible] = useState(
    false
  );
  const [addNewPaymentMethodVisible, setAddNewPaymentMethodVisible] = useState(
    false
  );

  const onChangePlan = (e) => {
    const plan = e.target.value;
    if (plan !== selectedPlan) {
      if (plan === "PREMIUM") {
        setUpgradePlanModalVisible(true);
      }
      if (plan === "BASIC") {
        setDowngradePlanModalVisible(true);
      }
    }
  };

  const handleChangePlan = (value) => {
    setSelectedPlan(value);
  };

  const callBackUpdateProfile = () => {
    GetUserProfile()
      .then((res) => {
        setProfileState(get(res, "data", {}));
      })
      .catch(() => {
        message.error("Error when update profile. Please try again.");
      });
  };

  const CloseUserAccount = () => {
    DeactiveUserProfile(profileState)
      .then(() => {
        // remove all Cookies
        Cookies.remove("token");
        message.success("Closed account successful!");
      })
      .catch(() => {
        message.error("Error occur when close that account. Please try again");
      });
  };

  return (
    <div className="w-full">
      <EditProfileModal
        editProfileModalVisible={editProfileModalVisible}
        setEditProfileModalVisible={setEditProfileModalVisible}
        callbackUpdateProfile={callBackUpdateProfile}
        profile={profileState}
        user={userState}
      />
      <UpgradePlanModal
        visible={upgradePlanModalVisible}
        setVisible={setUpgradePlanModalVisible}
        onChangePlan={handleChangePlan}
      />
      <DownGradePlanModal
        visible={downgradePlanModalVisible}
        setVisible={setDowngradePlanModalVisible}
        onChangePlan={handleChangePlan}
      />
      <AddPaymentMethodModal
        visible={addNewPaymentMethodVisible}
        setVisible={setAddNewPaymentMethodVisible}
      />
      <ProfileDetailSettingsSection
        profileState={profileState}
        setEditProfileModalVisible={setEditProfileModalVisible}
      />
      <section className="w-full mb-10">
        <div className="w-full flex">
          <H3>Plan</H3>
        </div>
        <div className="w-full flex">
          <div className="flex justify-between items-start w-full" {...settingPlanStyling}>
            <PlanDetailSection />
            <SubscriptionSection
              className="subscription-section"
              selectedPlan={selectedPlan}
              onChangePlan={onChangePlan}
              setAddNewPaymentMethodVisible={setAddNewPaymentMethodVisible}
            />
          </div>
        </div>
      </section>
      {/* <section className="w-full mb-10">
        <CustomCard>
          <div className="flex flex-col md:flex-row w-full sm:justify-start md:justify-between items-center">
            <span className="block md:flex justify-start items-center w-full">
              <LabelLarge className="mr-8 mb-4 md:mb-0 block md:flex font-normal">
                Pay Subscriptions
              </LabelLarge>
              <div className="flex sm:my-4 sm:justify-between mb-2">
                <div className="flex justify-start items-center">
                  <CircleColorIcon
                    className="bg-coinclustr-orange mr-2"
                    width="25px"
                    height="25px"
                    iconWidth="13px"
                    iconHeight="13px"
                  >
                    <BitcoinYellowIcon />
                  </CircleColorIcon>
                  <LabelLarge className="mr-8 m-0">BTC (Bitcoin)</LabelLarge>
                </div>
                <LabelLarge className="mr-8 m-0">0.2343</LabelLarge>
              </div>
            </span>
            <CustomButton
              type="primary"
              size="large"
              className="w-auto text-uppercase"
            >
              Top Up
            </CustomButton>
          </div>
        </CustomCard>
      </section> */}
      <NotificationSection />
      <section className="w-full mb-10">
        <div className="flex flex-col w-full">
          <H3>Close Account</H3>
          <Subtitle className="block mb-2">
            Deleting you account can not be reverced
          </Subtitle>
        </div>
        <div className="flex">
          <CustomButton
            className="outline"
            type="default"
            size="large"
            onClick={CloseUserAccount}
          >
            CLOSE ACCOUNT
          </CustomButton>
        </div>
      </section>
    </div>
  );
};

export default SettingProfilePage;
