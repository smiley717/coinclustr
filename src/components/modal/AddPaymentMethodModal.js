import React, { useState } from "react";

import CustomModal from "components/custom/CustomModal";

import AddNewPaymentMethodSelectWallet from "./screens/AddNewPaymentMethodSelectWallet";
import AddNewPaymentMethodSuccess from "./screens/AddNewPaymentMethodSuccess";

export const AddPaymentMethodModal = ({ visible, setVisible }) => {
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
          <AddNewPaymentMethodSelectWallet
            setStep={setStep}
            setModalStatus={handleChangeModalStatus}
            setModalLoader={handleChangeModalLoader}
          />
        );
      case 2:
        return (
          <AddNewPaymentMethodSuccess
            setVisible={setVisible}
            setModalStatus={handleChangeModalStatus}
          />
        );
      default:
        return (
          <AddNewPaymentMethodSelectWallet
            setStep={setStep}
            setModalStatus={handleChangeModalStatus}
            setModalLoader={handleChangeModalLoader}
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
      heading={step === 1 ? "Add a new payment method" : "Success"}
      loader={modalLoader}
    >
      {generateScreen()}
    </CustomModal>
  );
};
