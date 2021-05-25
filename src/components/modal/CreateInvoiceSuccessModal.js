import React from "react";
import { Link } from "react-router-dom";

import CustomModal from "../../styled/CustomModal";
import CustomButton from "../../styled/CustomButton";
import { H3, Subtitle } from "../../styled/Typography";

export const CreateInvoiceSuccessModal = ({ visible, setVisible }) => {
  return (
    <CustomModal
      centered
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      className="text-center block"
    >
      <H3 className="text-center">Success!</H3>
      <Subtitle className="py-16 block text-center">
        You've successfully added 2-step authentication to your account.
      </Subtitle>
      <Link to="/invoice">
        <CustomButton
          size="large"
          type="primary"
          className="mx-auto block mt-2"
        >
          BACK TO INVOICES
        </CustomButton>
      </Link>
    </CustomModal>
  );
};
