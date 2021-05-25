import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import get from "lodash/get";
import ConfirmPayment from "./screens/ConfirmPayment";
import CreatePayment from "./screens/CreatePayment";
import { Space } from 'antd';
import { CustomAlertDefaultRed } from "styled/CustomAlert";
import { CustomTabs, CustomTabPane, CustomTabWrapper } from "components/custom/CustomTabs";
import { BodyText500, H3 } from 'styled/Typography';
import { usePaymentTarget } from "./usePaymentTarget";
import { ReactComponent as ErrorIcon } from "img/icons/error.svg";

const CreatePaymentTabs = () => {
  const [step, setStep] = useState(1);
  const paymentTarget = usePaymentTarget();
  const [formData, setFormData] = useState({
    from_wallet: "",
    to_recipient: "",
    amount: 0,
  });

  const [isAPIError, setIsAPIError] = useState(false);

  const setNewStep = step => {
    setIsAPIError(false);
    setStep(step);
  }
  const TabContent = () => (
    step === 1 ? (
      <CreatePayment
        setStep={setNewStep}
        formData={formData}
        setFormData={setFormData}
        onInternalServerError={() => setIsAPIError(true)}
      />
    ) : (
      <ConfirmPayment
        setStep={setNewStep}
        formData={formData}
        setFormData={setFormData}
        onInternalServerError={setIsAPIError}
        isInternalServerError={isAPIError}
      />
    )
  );

  const onTabChange = () => {
    setIsAPIError(false);
  }
  const getClassName = (target) => `border-b-2 flex items-center justify-center flex-1 pb-1 text-coinclustr-gray-${paymentTarget === target ? "80 border-coinclustr-primary-blue" : "40 border-coinclustr-gray-bordered"}`;
  return (
    <>
      {isAPIError && <CustomAlertDefaultRed message="Oops, Something went wrong. Try again." type="error" showIcon icon={<ErrorIcon />} />}
      <H3 className="w-full text-center">{(step === 1) ? 'Create new payment' : 'Transfer payment'}</H3>

      <CustomTabWrapper direction="vertical" style={{ width: '100%' }}>
        {(step === 1) && (
          <CustomTabs centered defaultActiveKey={paymentTarget} onChange={onTabChange}>
            <CustomTabPane
              tab={(
                <Link
                  to="/payments/create?screen=coinclustr-account"
                  className="flex items-center"
                >
                  <BodyText500 className={getClassName("coinclustr-account")} >To Coinclustr account </BodyText500>
                </Link>
              )}
              key="coinclustr-account"
              className={getClassName("coinclustr-account")} />
            <CustomTabPane
              tab={(
                <Link
                  to="/payments/create?screen=address"
                  className="flex items-center"
                >
                  <BodyText500 className={getClassName("address")} >To Address</BodyText500>
                </Link>
              )}
              key="address" 
              className={getClassName("address")} />
          </CustomTabs>
        )}
        <Space className="flex" style={{ width: '100%', justifyContent: 'center' }}>
          <TabContent />
        </Space>
      </CustomTabWrapper>
    </>
  );
};

export default CreatePaymentTabs;
