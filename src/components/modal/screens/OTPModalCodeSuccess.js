import React, { useState } from "react";
import { Divider, Row, Col, Switch } from "antd";

import { H3, Subtitle, LabelLarge, BodyText } from "../../../styled/Typography";
import CustomButton from "../../../styled/CustomButton";

const OTPModalCodeSuccess = ({ phoneNumber }) => {
  const [checkConfirmedTwoFactor, setCheckConfirmedTwoFactor] = useState(true);

  const onChangeConfirmTwoFactor = (checked) => {
    setCheckConfirmedTwoFactor(checked);
  };

  return (
    <>
      <Subtitle className="block text-center">
        You've successfully added 2-step authentication to your account.
      </Subtitle>
      <Divider />
      <H3 className="block text-center mt-4">Two-factor authentication</H3>
      <Row className="py-3">
        <Col span={24} className="flex justify-between items-center">
          <LabelLarge className="mr-4">Two-factor authentication</LabelLarge>
          <Switch
            checked={checkConfirmedTwoFactor}
            onChange={onChangeConfirmTwoFactor}
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}>
          <LabelLarge className="block mb-2">Phone number</LabelLarge>
          <BodyText>{phoneNumber}</BodyText>
        </Col>
        <Col span={12}>
          <div className="flex justify-end items-center">
            <CustomButton size="large" type="default" className="outline">
              CHANGE
            </CustomButton>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24} className="flex justify-center items-center">
          <CustomButton size="large" type="primary">
            DONE
          </CustomButton>
        </Col>
      </Row>
    </>
  );
};

export default OTPModalCodeSuccess;
