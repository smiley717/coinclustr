import React, { useState } from "react";
import { Row, Col, Form, message, Spin } from "antd";
import { Link } from "react-router-dom";
import {
  LeftOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import get from "lodash/get";

import { CustomPaymentCard } from "styled/CustomCard";
import { LabelLarge, H3, BodyText500 } from "styled/Typography";
import CustomButton from "styled/CustomButton";
import CustomInput from "styled/CustomInput";
import CreateNewInvoiceModal from "components/modal/CreateNewInvoiceModal";

import BuiltInWalletSelect from "components/BuiltInWalletSelect";

import { CreateNewInvoice } from "services/InvoiceServices";

import theme from "utils/theme";
import { isEmail, isEmpty, isFloat, isInt } from "utils/common-utils";

import { ReactComponent as ErrorIcon } from "img/icons/error.svg";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 16, color: "white" }} spin />
);

const CreateInvoicePage = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0.000001);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState({});
  const [createNewInvoiceVisible, setCreateNewInvoiceVisible] = useState(false);
  const [newInvoiceID, setNewInvoiceID] = useState("");

  const handleCreateInvoice = () => {
    setIsCreating(true);
    const data = {
      amount: parseFloat(amount),
      test: true,
      wallet: selectedWallet,
      email: email,
      walletApiKey: "string",
    };
    CreateNewInvoice(data)
      .then((res) => {
        setNewInvoiceID(get(res, "data.invoiceId", ""));
        setIsCreating(false);
        setCreateNewInvoiceVisible(true);
      })
      .catch(() => {
        message.error("Error when create a new invoice. Please try again");
      });
  };

  const handleChangeWallet = (item) => {
    setSelectedWallet(item);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const generateAmountMessage = (value) => {
    if (isEmpty(value)) {
      return (
        <span className="flex items-center mt-1">
          <ErrorIcon />
          <span className="text-red-500 text-sm font-normal ml-1">
            Please enter an amount
          </span>
        </span>
      );
    }
    if (!isFloat(amount) && !isInt(amount)) {
      return (
        <span className="flex items-center mt-1">
          <ErrorIcon />
          <span className="text-red-500 text-sm font-normal ml-1">
            Invalid amount format
          </span>
        </span>
      );
    }
    if (parseFloat(amount) * 1000000 < 0.000001 * 1000000) {
      return (
        <span className="flex items-center mt-1">
          <ErrorIcon />
          <span className="text-red-500 text-sm font-normal ml-1">
            Amount should be greater than 0.000001
          </span>
        </span>
      );
    }
    return "";
  };

  const generateAmountInputStatus = (amount) => {
    if (isEmpty(amount)) {
      return "error";
    }
    if (!isFloat(amount) && !isInt(amount)) {
      return "error";
    }
    if (parseFloat(amount) * 1000000 < 0.000001 * 1000000) {
      return "error";
    }
    return "";
  };

  const isValidAmount = (amount) => {
    return (
      !isEmpty(amount) &&
      (isFloat(amount) || isInt(amount)) &&
      parseFloat(amount) * 1000000 >= 0.000001 * 1000000
    );
  };

  return (
    <div className="container my-8 mx-auto">
      <CreateNewInvoiceModal
        visible={createNewInvoiceVisible}
        onCancel={() => {
          setCreateNewInvoiceVisible(false);
        }}
        invoiceID={newInvoiceID}
      />
      <Row gutter={16}>
        <Col span={24}>
          <Link to="/invoices">
            <div className="flex justify-start items-center">
              <LeftOutlined style={{ color: theme.colors.gray50 }} />
              <LabelLarge className="ml-4">
                Back to the previous page
              </LabelLarge>
            </div>
          </Link>
        </Col>
      </Row>
      <Row gutter={16} className="mt-2">
        <Col span={24}>
          <H3 className="w-full text-center">Create new invoice</H3>
        </Col>
      </Row>
      <Row gutter={16} className="mt-12">
        <Col span={24} className="flex w-full justify-center">
          <CustomPaymentCard padding="16px">
            <Form
              name="basic"
              className="w-full form-center"
              layout="vertical"
            >
              <Form.Item
                label={<BodyText500>Wallet</BodyText500>}
                help={
                  <span className="flex items-center mt-1">
                    <InfoCircleOutlined />
                    <span className="text-coinclustr-gray-20 text-sm font-normal ml-1">
                      Please select wallet to receive funds
                    </span>
                  </span>
                }
              >
                <BuiltInWalletSelect
                  className="w-full"
                  onChange={handleChangeWallet}
                  status={false}
                />
              </Form.Item>
              <Form.Item
                label={<BodyText500>Amount</BodyText500>}
                className="mt-4 mb-0"
                help={generateAmountMessage(amount)}
                validateStatus={generateAmountInputStatus(amount)}
              >
                <CustomInput
                  value={amount}
                  onChange={handleChangeAmount}
                  placeholder="0.00 BTC"
                  help="The information is being validated..."
                />
              </Form.Item>
              <Form.Item
                label={<BodyText500>Email</BodyText500>}
                help={
                  !isEmail(email) && !isEmpty(email) ? (
                    <span className="flex items-center mt-1">
                      <ErrorIcon />
                      <span className="text-red-500 text-sm font-normal ml-1">
                        Email is not valid
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-center mt-1">
                      <InfoCircleOutlined className="text-coinclustr-gray-20" />
                      <span className="text-coinclustr-gray-20 text-sm font-normal ml-1">
                        Sends receipt of invoice to email provided
                        (optional)
                      </span>
                    </span>
                  )
                }
                validateStatus={
                  !isEmail(email) && !isEmpty(email) ? "error" : ""
                }
              >
                <CustomInput
                  value={email}
                  placeholder="Your email"
                  onChange={handleChangeEmail}
                />
              </Form.Item>
              <Form.Item className="submit-button-wrapper mt-12">
                <CustomButton
                  onClick={handleCreateInvoice}
                  disabled={
                    (!isEmpty(email) && !isEmail(email)) ||
                    isEmpty(selectedWallet) ||
                    !isValidAmount(amount)
                  }
                >
                  {!isCreating ? (
                    "Create Invoice"
                  ) : (
                    <Spin indicator={antIcon} />
                  )}
                </CustomButton>
                {isCreating && (
                  <span className="text-coinclustr-gray-20 text-sm font-normal ml-4">
                    Creating your invoice...
                  </span>
                )}
              </Form.Item>
            </Form>
          </CustomPaymentCard>
        </Col>
      </Row>
    </div>
  );
};
export default CreateInvoicePage;
