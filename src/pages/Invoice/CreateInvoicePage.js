import React, { useState } from "react";
import { Row, Col, Form, message, Spin } from "antd";
import { Link } from "react-router-dom";
import {
  LeftOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import get from "lodash/get";

import CustomCard from "styled/CustomCard";
import { LabelLarge, H3, Label } from "styled/Typography";
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
          <H3>Create new invoice</H3>
        </Col>
      </Row>
      <Row gutter={16} className="mt-2">
        <Col span={24}>
          <CustomCard padding="24px">
            <div className="w-full mx-auto">
              <Form>
                <div className="flex mb-4 w-full">
                  <div className="w-3/12 pt-3">
                    <Label className="text-coinclustr-gray-50">Wallet</Label>
                  </div>
                  <div className="w-8/12">
                    <Form.Item
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
                  </div>
                </div>
                <div className="flex mb-4 w-full">
                  <div className="w-3/12 pt-3">
                    <Label className="text-coinclustr-gray-50">Amount</Label>
                  </div>
                  <div className="w-8/12">
                    <Form.Item
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
                  </div>
                </div>
                <div className="flex mb-4 w-full">
                  <div className="w-3/12 pt-3">
                    <Label className="text-coinclustr-gray-50">Email</Label>
                  </div>
                  <div className="w-8/12">
                    <Form.Item
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
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-3/12"></div>
                  <div className="w-8/12 flex items-center">
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
                  </div>
                </div>
              </Form>
            </div>
          </CustomCard>
        </Col>
      </Row>
    </div>
  );
};
export default CreateInvoicePage;
