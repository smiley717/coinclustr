import React, { useState } from "react";

import CustomModal from "components/custom/CustomModal";

import UpgradePlanSelectWallet from "./screens/UpgradePlanSelectWallet";
import UpgradePlanSuccess from "./screens/UpgradePlanSuccess";

export const UpgradePlanModal = ({ visible, setVisible, onChangePlan }) => {
  const [step, setStep] = useState(1);
  const [modalStatus, setModalStatus] = useState("normal");
  const [modalLoader, setModalLoader] = useState({
    visible: false,
    title: "loading...",
  });

  const handleChangeModalStatus = (status) => {
    setModalStatus(status);
  };

  const handleChangeModalLoader = (loader) => {
    setModalLoader(loader);
  };

  const generateScreen = () => {
    switch (step) {
      case 1:
        return (
          <UpgradePlanSelectWallet
            setStep={setStep}
            setModalStatus={handleChangeModalStatus}
            setModalLoader={handleChangeModalLoader}
            onChangePlan={onChangePlan}
          />
        );
      case 2:
        return (
          <UpgradePlanSuccess
            setVisible={setVisible}
            setModalStatus={handleChangeModalStatus}
          />
        );
      default:
        return (
          <UpgradePlanSelectWallet
            setStep={setStep}
            setModalStatus={handleChangeModalStatus}
          />
        );
    }
  };

  return (
    <CustomModal
      visible={visible}
      onCancel={() => {
        setVisible(false);
        setStep(1);
      }}
      status={modalStatus}
      heading={step === 1 ? "Upgrade Subscription Plan" : "Success"}
      loader={modalLoader}
    >
      {generateScreen()}
    </CustomModal>
  );
};
