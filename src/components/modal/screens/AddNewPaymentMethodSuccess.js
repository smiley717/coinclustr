import React from "react";
import { useHistory } from "react-router-dom";

import { Subtitle } from "../../../styled/Typography";
import CustomButton from "../../../styled/CustomButton";

const AddNewPaymentMethodSuccess = ({ setVisible }) => {
  const history = useHistory();

  const reFetchProfile = () => {
    setVisible(false);
    history.push("/settings/profile?premium=success");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Subtitle className="mb-16 block text-center w-full">
        Subscription plan was successfully changed.
      </Subtitle>
      <CustomButton type="primary" size="large" onClick={reFetchProfile}>
        BACK TO SETTINGS
      </CustomButton>
    </div>
  );
};

export default AddNewPaymentMethodSuccess;
