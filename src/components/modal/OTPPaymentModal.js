import React, { useState, useEffect } from "react";
import get from "lodash/get";
import { useRecoilState } from "recoil";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import OTPModalCodeInput from "./screens/OTPModalCodeInput";
import OTPModalCodeSuccess from "./screens/OTPModalCodeSuccess";
import { profileDataState, settingsDateState } from "recoil/user";
import { ResendOtpCode, VerifyOTPCode } from "services/CustomerService";

import CustomModal from "styled/CustomModal";
import { H3 } from "styled/Typography";
import { isEmpty } from "utils/common-utils";

export const OTPPaymentModal = ({ visible, setVisible, formData, callback }) => {
  const [profileState] = useRecoilState(profileDataState);
  const [settingsState] = useRecoilState(settingsDateState);
  const [isProcessing] = useState(false);
  const [OTPCodeStatus, setOTPCodeStatus] = useState("");
  const [OTPCode, setOTPCode] = useState("");
  const [step, setStep] = useState(1);
  const history = useHistory();

  const { mfaSettings: {phoneNumber}} = settingsState; 

  const submitOTPCode = () => {
    // check the OTP code here
    const data = {
      initializeMfa: true,
      otpCode: OTPCode,
    };
    VerifyOTPCode(data)
      .then((response) => {
        setOTPCodeStatus("");
        const { amount, from_wallet, to_recipient } = formData;
        const { jwtToken } = response.data;
        message.success("Correct OTP code");
        if (isEmpty(amount) || isEmpty(from_wallet) || isEmpty(to_recipient)) {
          message.error("Invalid data to create payment");
          history.push("/payments");
        } else {
          callback(jwtToken);
        }
      })
      .catch((err) => {
        const error_message = get(err, "response.data.errorMessage", "");
        setOTPCodeStatus("error_message");
        message.error(error_message);
      });
  };

  const resendOtpCode = () => {
    ResendOtpCode().then(() => {
      message.success("Resent Otp");
    })
    .catch((err) => {
      const error_message = get(err, "response.data.errorMessage", "");
      message.error(error_message);
    });

  }

  const generateScreen = () => {
    switch (step) {
      case 1:
        return (
          <OTPModalCodeInput
            OTPCode={OTPCode}
            setOTPCode={setOTPCode}
            submitOTPCode={submitOTPCode}
            phoneNumber={phoneNumber}
            status={OTPCodeStatus}
            isProcessing={isProcessing}
            resend={resendOtpCode}
          />
        );
      case 2:
        return <OTPModalCodeSuccess phoneNumber={phoneNumber} />;
      default:
        return null;
    }
  };

  // useEffect(() => {
  //   setPhoneNumber(get(settingsState, "phoneNumber"));
  // }, [profileState]);

  return (
    <CustomModal
      centered
      visible={visible}
      onCancel={() => {
        setVisible(false);
        setStep(1);
      }}
      footer={null}
      className="text-center"
    >
      <H3 className="text-center">
        {step === 3 ? "Success!" : "Enable 2 step verification"}
      </H3>
      {generateScreen()}
    </CustomModal>
  );
};
