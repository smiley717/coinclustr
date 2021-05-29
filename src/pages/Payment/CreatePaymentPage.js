import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import get from "lodash/get";

import { H3 } from "../../styled/Typography";
import { CreateInvoiceSuccessModal } from "../../components/modal";
import GoBackButton from "../../components/GoBackButton";

import ConfirmPayment from "./screens/ConfirmPayment";
import CreatePayment from "./screens/CreatePayment";
import CreatePaymentTabs from "./CreatePaymentTabs";

const CreatePaymentPage = () => {
  const location = useLocation();
  const [
    createPaymentSuccessModalVisible,
    setCreatePaymentSuccessModalVisible,
  ] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentTarget, setPaymentTarget] = useState("");
  const [formData, setFormData] = useState({
    from_wallet: "",
    to_recipient: "",
    amount: 0,
  });

  useEffect(() => {
    setPaymentTarget(
      get(queryString.parse(location.search), "screen", "coinclustr-account")
    );
  }, [location.search]);

  return (
    <div className="container my-8 mx-auto">
      <CreateInvoiceSuccessModal
        visible={createPaymentSuccessModalVisible}
        setVisible={setCreatePaymentSuccessModalVisible}
      />
      <div className="flex">
        <GoBackButton url="/payments" text="Back to the previous page" />
      </div>
      <CreatePaymentTabs />
    </div>
  );
};
export default CreatePaymentPage;
