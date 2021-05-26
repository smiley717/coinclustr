import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import get from "lodash/get";
import CustomButton from "../../../styled/CustomButton";
import { isEmpty } from "utils/common-utils";
import { BodyText500 } from "styled/Typography";
import BuiltInWalletSelect from "components/BuiltInWalletSelect";
import { Verified } from "components/Verified";
import WalletValidator from "components/WalletValidator";
import { usePaymentTarget } from "../usePaymentTarget";
import { CoinToCurrency } from "components/CoinToCurrency";
import { PreValidatePayment } from "services/PaymentServices";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { preValidatedId } from "recoil/payments";
import { errorStatus } from "utils/error-status";
import { CustomPaymentCard } from "../../../styled/CustomCard";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const CreatePayment = ({ setStep, formData, setFormData, onInternalServerError }) => {
  const [createPaymentForm] = Form.useForm();
  const [showVerifiedFrom, setShowVerifiedFrom] = useState(false);
  const [showVerifiedTo, setShowVerifiedTo] = useState(false);
  const [showVerifiedAmount, setShowVerifiedAmount] = useState(false);
  const paymentTarget = usePaymentTarget();
  const setPaymentId = useSetRecoilState(preValidatedId);
  
  const paymentId = useRecoilValue(preValidatedId);

  const preValidate = (values, id) => {
    const { amount, from_wallet, to_recipient } = values;
    const create_payment_request_data = {
      action: "P2P",
      amount: parseFloat(amount),
      senderWalletId: get(from_wallet, "walletId"),
      toAddress: "",
      toPeer: to_recipient,
      type: get(from_wallet, "type"),
    };
    PreValidatePayment(create_payment_request_data, id)
      .then((res) => {
        if (res) {
          const { data } = res;
          if (data) {
            const { sendPaymentId } = data;
            if (sendPaymentId) {
              setPaymentId(sendPaymentId);
              setFormData({
                amount,
                from_wallet,
                to_recipient,
              });
              setStep(2);
            }
          }
        }
      })
      .catch(() => {
        message.error("Error when create a payment. Please try again");
      });
  }
  useEffect(() => {
    if (formData.amount > 0) {
      setShowVerifiedAmount(true);
    }
  }, [formData.amount]);

  const onFinish = (values) => {
    const { amount, from_wallet, to_recipient } = values;
    if (Number(amount) <= 0) {
      setShowVerifiedAmount(false);
      return false;
    } else {

      const create_payment_request_data = {
        action: paymentTarget === "address" ? "TO_ADDRESS" : "P2P",
        amount: parseFloat(amount),
        senderWalletId: get(from_wallet, "walletId"),
        toAddress: to_recipient,
        toPeer: to_recipient,
        type: get(from_wallet, "type"),
      };
      PreValidatePayment(create_payment_request_data)
        .then(({ data: { sendPaymentId } }) => {
          setPaymentId(sendPaymentId);
          setFormData({
            amount,
            from_wallet,
            to_recipient,
          });
          setStep(2);
        })
        .catch((err) => {
          errorStatus(err, onInternalServerError, onInternalServerError);
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onWalletValidatorChange = (wallet) => {
    createPaymentForm.setFieldsValue({ to_recipient: wallet });
    setShowVerifiedTo(true);
  };
  const onWalletSelect = (selectedWallet) => {
    createPaymentForm.setFieldsValue({ from_wallet: selectedWallet });
    setShowVerifiedFrom(true);
  };

  const onAmountChange = (amount) => {
    createPaymentForm.setFieldsValue({ amount });
    setShowVerifiedAmount(true);
  };
  return (
    <CustomPaymentCard padding="16px">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          amount: get(formData, "amount", 0),
          from_wallet: get(formData, "from_wallet.walletId", ""),
          to_recipient: isEmpty(get(formData, "from_wallet.walletId", ""))
            ? get(formData, "from_wallet", "")
            : get(formData, "from_wallet.walletId", ""),
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="w-full form-center"
        form={createPaymentForm}
        layout="vertical"
      >

        <Form.Item
          label={(<BodyText500>From wallet</BodyText500>)}
          name="from_wallet"
        >
          <BuiltInWalletSelect onChange={onWalletSelect} status={{}} preSelectedWallet={formData.from_wallet} />
          {showVerifiedFrom && <Verified />}
        </Form.Item>
        <Form.Item
          label={(<BodyText500>To recipient</BodyText500>)}
          name="to_recipient"
        >
          <WalletValidator
            onChange={onWalletValidatorChange}
            paymentTarget={paymentTarget}
            preSelectedWallet={formData.to_recipient}
            onInternalServerError={onInternalServerError}
            reverse />
        </Form.Item>
        <Form.Item
          label={(<BodyText500>Amount</BodyText500>)}
          name="amount"
        >
          <CoinToCurrency amount={formData.amount} onChange={onAmountChange} />
          {showVerifiedAmount && <Verified />}
        </Form.Item>
        <Form.Item className="submit-button-wrapper mt-12">
          <CustomButton type="primary" htmlType="submit" size="large" disabled={!showVerifiedTo || !showVerifiedFrom || !showVerifiedAmount}>
            CONTINUE
            </CustomButton>
        </Form.Item>
      </Form>
    </CustomPaymentCard>
  );
};
export default CreatePayment;
