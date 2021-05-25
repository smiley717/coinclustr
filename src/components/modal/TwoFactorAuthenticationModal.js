import React, { useState } from "react";
import { Divider, Switch } from "antd";

import CustomModal from "components/custom/CustomModal";
import CustomButton from "styled/CustomButton";
import { LabelLarge, BodyText } from "styled/Typography";

export const TwoFactorAuthenticationModal = ({ visible, setVisible }) => {
  const [checkConfirmedTwoFactor, setCheckConfirmedTwoFactor] = useState(true);
  const [phonenumber] = useState("+44");

  const onChangeConfirmTwoFactor = (checked) => {
    setCheckConfirmedTwoFactor(checked);
  };
  return (
    <CustomModal
      visible={visible}
      onCancel={() => setVisible(false)}
      heading="Two-factor authentication"
    >
      <div className="flex justify-between items-center pt-5">
        <LabelLarge>Two-factor authentication</LabelLarge>
        <Switch
          checked={checkConfirmedTwoFactor}
          onChange={onChangeConfirmTwoFactor}
        />
      </div>
      <Divider />
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-start">
          <LabelLarge className="block mb-2">Phone number</LabelLarge>
          <BodyText className="text-left">{phonenumber}</BodyText>
        </div>
        <div className="flex items-center justify-end">
          <CustomButton
            size="small"
            type="default"
            className="outline uppercase"
          >
            Change
          </CustomButton>
        </div>
      </div>
      <Divider />
      <div className="w-full flex justify-center items-center">
        <CustomButton size="large" type="primary" className="px-16">
          DONE
        </CustomButton>
      </div>
    </CustomModal>
  );
};
