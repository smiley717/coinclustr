import React, { useState } from "react";
import { message } from "antd";
import { useRecoilState } from "recoil";

import CustomModal from "../../styled/CustomModal";
import CustomButton from "../../styled/CustomButton";
import { ResendVerificationEmail } from "../../services/CustomerService";
import { userDataState } from "../../recoil/user";

export const VerifyEmailModal = ({ email, visible, setVisible }) => {
  const [userState] = useRecoilState(userDataState);
  const [processing, setProcessing] = useState(false);

  const resendVeificationEmail = () => {
    setProcessing(true);
    const { userId } = userState;
    ResendVerificationEmail(userId)
      .then(() => {
        setProcessing(false);
        message.success("Email has been resent");
      })
      .catch(() => {
        setProcessing(false);
      });
  };

  return (
    <CustomModal
      centered
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <h3 className="title">Verify your email</h3>
      <p>
        {`Open your email to get the verification link we sent to ${email}`}
      </p>
      <CustomButton
        type="primary"
        size="large"
        className="center"
        onClick={resendVeificationEmail}
        loading={processing}
      >
        Resend email
      </CustomButton>
    </CustomModal>
  );
};
