import React from "react";
import { Link, useHistory } from "react-router-dom";

import CustomButton from "styled/CustomButton";
import CustomModal from "components/custom/CustomModal";
import { Subtitle, Label } from "styled/Typography";

const CreateNewInvoiceModal = ({ visible, setVisible, invoiceID }) => {
  let history = useHistory();
  return (
    <CustomModal
      visible={visible}
      status="success"
      heading="Success"
      loader={{ visible: false, title: "" }}
      footer={null}
      onCancel={() => history.push("/invoices")}
    >
      <div className="flex flex-col items-center py-3">
        <Subtitle className="text-coinclustr-gray-20 text-base mb-4">
          You've invoice was successfully created.
        </Subtitle>
        <Label className="text-coinclustr-gray-80 text-sm mb-6">{`ID: ${invoiceID}`}</Label>
        <Link to="/invoices">
          <CustomButton>BACK TO INVOICES</CustomButton>
        </Link>
      </div>
    </CustomModal>
  );
};

export default CreateNewInvoiceModal;
