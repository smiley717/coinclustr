import React, { useState } from "react";
import get from "lodash/get";
import { message } from "antd";

import OTPModalPhoneInput from "./screens/OTPModalPhoneInput";
import OTPModalCodeInput from "./screens/OTPModalCodeInput";
import OTPModalCodeSuccess from "./screens/OTPModalCodeSuccess";

import { Enable2FA, VerifyOTPCode } from "../../services/CustomerService";
import { isEmpty } from "utils/common-utils";

import "react-phone-input-2/lib/style.css";
import CustomModal from "../../styled/CustomModal";
import { H3 } from "../../styled/Typography";

export const OTPModal = ({ visible, setVisible }) => {
  const [phoneNumber, setPhoneNumber] = useState("+44");
  const [isProcessing, setIsProcessing] = useState(false);
  const [countryCodeNumber, setCountryCodeNumber] = useState("");
  const [phoneNumberStatus, setPhoneNumberStatus] = useState("");
  const [OTPCodeStatus, setOTPCodeStatus] = useState("");
  const [OTPCode, setOTPCode] = useState("");
  const [step, setStep] = useState(1);

  const submitPhoneNumber = () => {
    // const fullPhoneNumber = phoneNumber;
    setIsProcessing(true);
    const countryCode = !isEmpty(countryCodeNumber)
      ? countryCodeNumber.countryCode.toUpperCase()
      : "";
    const data = {
      countryCode: countryCode,
      phoneNumber: "+" + phoneNumber,
    };
    Enable2FA(data)
      .then(() => {
        setIsProcessing(false);
        setPhoneNumberStatus("");
        setStep(2);
      })
      .catch((err) => {
        setIsProcessing(false);
        const error_message = get(err, "response.data.errorMessage", "");
        message.error(error_message);
        setPhoneNumberStatus(error_message);
      });
  };

  const submitOTPCode = () => {
    // check the OTP code here
    const data = {
      initializeMfa: true,
      otpCode: OTPCode,
    };
    VerifyOTPCode(data)
      .then(() => {
        setOTPCodeStatus("");
        setStep(3);
      })
      .catch((err) => {
        const error_message = get(err, "response.data.errorMessage", "");
        setOTPCodeStatus("error_message");
        message.error(error_message);
      });
  };

  const generateScreen = () => {
    switch (step) {
      case 1:
        return (
          <OTPModalPhoneInput
            phoneNumber={phoneNumber}
            countryCode={countryCodeNumber}
            setPhoneNumber={setPhoneNumber}
            setCountryCodeNumber={setCountryCodeNumber}
            submitPhoneNumber={submitPhoneNumber}
            status={phoneNumberStatus}
            isProcessing={isProcessing}
          />
        );
      case 2:
        return (
          <OTPModalCodeInput
            OTPCode={OTPCode}
            setOTPCode={setOTPCode}
            submitOTPCode={submitOTPCode}
            phoneNumber={phoneNumber}
            status={OTPCodeStatus}
            resend={submitPhoneNumber}
            isProcessing={isProcessing}
          />
        );
      case 3:
        return <OTPModalCodeSuccess phoneNumber={phoneNumber} />;
      default:
        return (
          <OTPModalPhoneInput
            phoneNumber={phoneNumber}
            countryCode={countryCodeNumber}
            setPhoneNumber={setPhoneNumber}
            setCountryCodeNumber={setCountryCodeNumber}
            submitPhoneNumber={submitPhoneNumber}
            status={phoneNumberStatus}
          />
        );
    }
  };

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
