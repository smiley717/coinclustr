import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Button } from "antd";

import { Subtitle, Label, BodyText } from "../../../styled/Typography";
import CustomButton from "../../../styled/CustomButton";

import { ReactComponent as ErrorIcon } from "../../../img/icons/error.svg";

const OTPModalCodeInput = ({
  OTPCode,
  setOTPCode,
  phoneNumber,
  status,
  submitOTPCode,
  resend,
}) => {
  const [resendTimer, setResendTimer] = useState(0);

  const startCountdownTimer = () => {
    setResendTimer(59);
  };

  const handleResendAction = () => {
    startCountdownTimer();
    resend();
  };

  useEffect(() => {
    if (!resendTimer) return;
    const intervalId = setInterval(() => {
      setResendTimer(resendTimer - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [resendTimer]);

  return (
    <>
      <Subtitle className="block text-center">
        {`We sent confirmation 6 -symbols code to the number ${phoneNumber}.`}
      </Subtitle>
      <Label className="block text-center mt-2">
        Enter verification code below:
      </Label>
      <div className="mx-auto">
        <OtpInput
          value={OTPCode}
          onChange={setOTPCode}
          numInputs={6}
          separator={<span> </span>}
          className="otp-input"
          shouldAutoFocus={true}
          containerStyle={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "32px auto",
            width: "320px",
          }}
          hasErrored={status}
          inputStyle={{
            border: "none",
            borderBottom: "2px solid #1D66FF",
            padding: "4px 8px",
            fontSize: "16px",
            outline: "none",
            width: "32px",
          }}
          errorStyle={{
            border: "none",
            borderBottom: "2px solid #EB5757",
            padding: "4px 8px",
            fontSize: "16px",
            outline: "none",
            color: "#EB5757",
            width: "32px",
          }}
        />
        {status === "error" ? (
          <div className="flex items-center justify-center">
            <ErrorIcon className="mr-2" />
            <BodyText className="text-coinclustr-text">
              The code you entered is invalid.
            </BodyText>
          </div>
        ) : null}
      </div>
      <div className="w-full text-center">
        <CustomButton
          type="primary"
          size="large"
          className="mx-auto"
          onClick={submitOTPCode}
        >
          SUBMIT
        </CustomButton>
      </div>
      {resendTimer === 0 ? (
        <div className="w-full text-center mt-6">
          <BodyText>
            Didn't get the code?
            <Button
              type="link"
              onClick={handleResendAction}
              className="uppercase"
            >
              Resend
            </Button>
          </BodyText>
        </div>
      ) : (
        <div className="w-full text-center mt-6">
          <BodyText>
            Resend code in{" "}
            <BodyText className="text-coinclustr-primary-blue">
              {`0:${("0" + resendTimer).slice(-2)}`}
            </BodyText>
          </BodyText>
        </div>
      )}
    </>
  );
};

export default OTPModalCodeInput;
