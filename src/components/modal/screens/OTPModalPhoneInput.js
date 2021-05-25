import React from "react";
import PhoneInput from "react-phone-input-2";

import { Subtitle, BodyText } from "../../../styled/Typography";
import CustomButton from "../../../styled/CustomButton";

import { isEmpty } from "utils/common-utils";

import { ReactComponent as ErrorIcon } from "../../../img/icons/error.svg";

const OTPModalPhoneInput = ({
  phoneNumber,
  setPhoneNumber,
  setCountryCodeNumber,
  status,
  submitPhoneNumber,
  isProcessing,
}) => {
  return (
    <>
      <Subtitle className="block text-center">
        At Coinclustr, safety comes first. To keep your account secure, we send
        you a verification code when you sign in with a new device.
      </Subtitle>
      <div className="mx-auto py-8">
        <PhoneInput
          value={phoneNumber}
          onChange={(phone, country) => {
            setPhoneNumber(phone, country);
            setCountryCodeNumber(country);
          }}
          isValid={status.length > 0 ? false : true}
        />
        {status.length > 0 ? (
          <div className="flex items-center justify-center">
            <ErrorIcon className="mr-2" />
            <BodyText className="text-coinclustr-red">
              The mobile number you entered is invalid.
            </BodyText>
          </div>
        ) : null}
      </div>
      <div className="w-full text-center">
        <CustomButton
          type="primary"
          size="large"
          className="mx-auto"
          onClick={submitPhoneNumber}
          disabled={isEmpty(phoneNumber)}
          loading={isProcessing}
        >
          SEND OTP
        </CustomButton>
      </div>
    </>
  );
};

export default OTPModalPhoneInput;
