import React, { useState } from "react";
import { message } from "antd";
import { useRecoilState } from "recoil";

import CustomModal from "components/custom/CustomModal";

import { BodyText } from "styled/Typography";
import CustomButton from "styled/CustomButton";
import { profileDataState } from "recoil/user";

import { DowngradeToBasicPlan } from "services/BillingServices";

export const DownGradePlanModal = ({ visible, setVisible, onChangePlan }) => {
  const [profileState] = useRecoilState(profileDataState);
  const [modalLoader, setModalLoader] = useState({
    visible: false,
    title: "loading...",
  });

  const handleDowngrade = () => {
    const { subscriptionId } = profileState;
    setModalLoader({
      visible: true,
      title: "downgrading...",
    });
    DowngradeToBasicPlan()
      .then(() => {
        onChangePlan("BASIC");
        setVisible(false);
        message.success("Downgrade success");
        setModalLoader({
          visible: false,
          title: "",
        });
      })
      .catch((err) => {
        message.error(err.message);
        setVisible(false);
        setModalLoader({
          visible: false,
          title: "",
        });
      });
  };

  return (
    <CustomModal
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      heading="Are you sure you want to downgrade to the Free plan?"
      loader={modalLoader}
    >
      <BodyText>
        You can use your current plan untill the day before your next payment
        date. If you switch to the Free plan you will not get charged on your
        next payment date.
      </BodyText>
      <div className="w-7/12 flex items-center justify-center mx-auto mt-8">
        <CustomButton
          className="outline mr-4"
          onClick={() => setVisible(false)}
        >
          Cancel
        </CustomButton>
        <CustomButton className="ml-4" onClick={handleDowngrade}>
          Downgrade
        </CustomButton>
      </div>
    </CustomModal>
  );
};
