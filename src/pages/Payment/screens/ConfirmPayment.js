import React, { useState, useEffect } from "react";
import { Row, Col, message } from "antd";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { CustomCardExtended } from "styled/CustomCard";
import { LabelLarge, BodyText, Label, H3 } from "styled/Typography";
import CustomButton from "styled/CustomButton";
import { OTPPaymentModal } from "components/modal/OTPPaymentModal";
import { PaymentTransferSuccessModal } from "components/modal/PaymentTransferSuccessModal";
import { isEmpty } from "utils/common-utils";
import { ReactComponent as BitcoinYellowIcon } from "img/icons/bitcoin-orange-small.svg";
import { ReactComponent as Progress } from "img/icons/circular-progress.svg";
import { ReactComponent as EditIcon } from "img/icons/edit-wallet.svg";
import { useRecoilValue } from "recoil";
import { preValidatedId } from "recoil/payments";
import { SendPayment } from "services/PaymentServices";
import { errorStatus } from "utils/error-status";

const EditStyles = {
  position: "absolute",
  top: "24px",
  right: "24px",
  width: "40px",
  transform: "scale(1.3)",
  cursor: "pointer",
};

const FromWalletStyle = {
  display: 'grid',
  gridTemplateColumns: '30px 1fr',
  gap: '10px',
  alignItems: 'center',
}

const SuccessBorderStyle = {
  borderTop: '8px solid #27AE60'
}

const ProgressStyle = {
  display: 'grid',
  gap: '10px',
  justifyContent: 'center',
}

const ConfirmPayment = ({ setStep, formData, setFormData, enableEdit = false, onInternalServerError, isInternalServerError }) => {
  const [
    paymentTransferModalVisible,
    setPaymentTransferModalVisible,
  ] = useState(false);
  const [modalOTPVisible, setModalOTPVisible] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const history = useHistory();
  const paymentId = useRecoilValue(preValidatedId);
  const backToPayments = () => history.push("/payments");
  useEffect(() => {
    if (
      formData.amount === 0 ||
      isEmpty(formData.from_wallet) ||
      isEmpty(formData.to_recipient)
    ) {
      setFormData({
        from_wallet: "",
        to_recipient: "",
        amount: 0,
      });
      backToPayments();
    }
  }, [formData, history, setFormData]);

  const handlePayPayment = () => {
    setModalOTPVisible(true);
  };

  const callback = (token) => {
    setModalOTPVisible(false);
    setLoaderVisible(true);
    SendPayment(paymentId, token)
      .then(() => {
        setSuccessVisible(true);
      })
      .catch((err) => {
        errorStatus(err, onInternalServerError, onInternalServerError);
      })
      .finally(() => {
        setLoaderVisible(false);
      });
  }

  const { amount, from_wallet, to_recipient } = formData;
  return (
    <Row gutter={24} className="mt-2">
      <PaymentTransferSuccessModal
        visible={paymentTransferModalVisible}
        setVisible={setPaymentTransferModalVisible}
      />
      <OTPPaymentModal
        visible={modalOTPVisible}
        setVisible={setModalOTPVisible}
        formData={formData}
        callback={callback}
      />
      <Col span={24}>
        <CustomCardExtended padding="24px" display="block" style={(successVisible ? { ...SuccessBorderStyle } : {})}>
          {loaderVisible && (
            <div style={ProgressStyle} >
              <Progress className="animate-spin" style={{ margin: '0 auto' }} />
              <Label>Checking your info...</Label>
            </div>
          )}
          {successVisible && (
            <div style={ProgressStyle} >
              <H3 className="text-center">Success!</H3>
              <Label>Your transfer {`${amount} ${from_wallet.type}`} to your wallet on the way</Label>
              <Row gutter={24} className="mb-2 mt-2">
                <Col span={4}></Col>
                <Col span={16}>
                  <CustomButton
                    type="primary"
                    size="large"
                    className="w-full text-center"
                    onClick={backToPayments}
                  >
                    BACK TO PAYMENTS
              </CustomButton>
                </Col>
                <Col span={4}></Col>
              </Row>
            </div>
          )}
          {(!loaderVisible && !successVisible) && (
            <>
              {enableEdit && <EditIcon style={EditStyles} onClick={() => setStep(1)} />}
              <Row gutter={24} className="mb-2">
                <Col span={10} className="text-left">
                  <LabelLarge>From wallet</LabelLarge>
                </Col>
                <Col span={14} style={FromWalletStyle}>
                  <BitcoinYellowIcon />
                  <BodyText>{from_wallet.type}</BodyText>
                </Col>
              </Row>
              <Row gutter={24} className="mb-2">
                <Col span={10} className="text-left">
                  <LabelLarge>To recipinet</LabelLarge>
                </Col>
                <Col span={14}>
                  <BodyText> {to_recipient} </BodyText>
                </Col>
              </Row>
              <Row gutter={24} className="mb-2">
                <Col span={10} className="text-left">
                  <LabelLarge>Payment purpose</LabelLarge>
                </Col>
                <Col span={14}>
                  <BodyText>Personal funds transfer</BodyText>
                </Col>
              </Row>
              <Row gutter={24} className="mb-2">
                <Col span={10} className="text-left">
                  <LabelLarge>To be credited</LabelLarge>
                </Col>
                <Col span={14}>
                  <BodyText>{`${amount} ${from_wallet.type}`}</BodyText>
                </Col>
              </Row>
              <Row gutter={24} className="mb-2">
                <Col span={10} className="text-left">
                  <LabelLarge>Fees</LabelLarge>
                </Col>
                <Col span={14}>
                  <BodyText>0 USD</BodyText>
                </Col>
              </Row>
              <Row gutter={24} className="mb-2 mt-12">
                <Col span={6}></Col>
                <Col span={12}>
                  <CustomButton
                    type="primary"
                    size="large"
                    className="w-full"
                    onClick={handlePayPayment}
                    disable={isInternalServerError}
                  >
                    SEND PAYMENT
              </CustomButton>
                </Col>
                <Col span={6}></Col>
              </Row>
              <Row gutter={24} className="mb-2 mt-2">
                <Col span={6}></Col>
                <Col span={12}>
                  <Button
                    type="link"
                    size="large"
                    className="w-full"
                    onClick={backToPayments}
                  >
                    CANCEL
                  </Button>
                </Col>
                <Col span={6}></Col>
              </Row>
            </>
          )}
        </CustomCardExtended>
      </Col>
    </Row>
  );
};
export default ConfirmPayment;
