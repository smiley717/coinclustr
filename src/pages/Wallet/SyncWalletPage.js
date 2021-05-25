import React, { useState, useRef } from "react";
import { Row, Col, Form, Input, Select, message } from "antd";
import {
  LeftOutlined,
  InfoCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { debounce, get } from "lodash";
import { css } from "glamor";
// import { useRecoilState } from "recoil";

import CustomCard from "../../styled/CustomCard";
import CustomAlert from "../../styled/CustomAlert";
import { H3, LabelLarge, BodyText } from "../../styled/Typography";
import CustomButton from "../../styled/CustomButton";

import {
  SyncNewWallet,
  VerifyWalletAddress,
} from "../../services/WalletServices";
// import { userDataState } from "../../recoil/user";

import { ReactComponent as ValidationIcon } from "../../img/icons/validation.svg";
import { ReactComponent as ErrorIcon } from "../../img/icons/error.svg";
import { ReactComponent as CheckedIcon } from "../../img/icons/checked.svg";

import theme from "../../utils/theme";
import { isName, isEmpty, isUrl } from "utils/common-utils";

const { Option } = Select;

const inputStyles = css({
  width: "400px !important",
});

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

const ValidationButton = ({ valid, isValidating }) => {
  if (valid === "verified" && !isValidating) {
    return (
      <div className="flex justify-start items-center cursor-pointer ml-2">
        <CheckedIcon />
        <BodyText className="text-coinclustr-green ml-2">Verified</BodyText>
      </div>
    );
  } else if (valid === "failed" && !isValidating) {
    return (
      <div className="flex justify-start items-center cursor-pointer ml-2">
        <BodyText className="flex text-coinclustr-red">
          <StopOutlined />
        </BodyText>
        <BodyText className="ml-2 text-coinclustr-red">Failed</BodyText>
      </div>
    );
  }
  return (
    <div className="flex justify-start items-center cursor-pointer ml-2">
      <ValidationIcon
        className={`${isValidating ? "spin" : ""}`}
        style={{ color: theme.colors.blueIconColor }}
      />
      <span className="ml-2" style={{ color: theme.colors.blueIconColor }}>
        {isValidating ? "Validating" : "Validation"}
      </span>
    </div>
  );
};

const SyncWalletPage = () => {
  // const [userState] = useRecoilState(userDataState);
  const history = useHistory();
  const [syncingError, setSyncingError] = useState(false);
  const [selectedCryptoCurrency, setSelectedCryptoCurrency] = useState("");
  const [isSynching, setIsSynching] = useState(false);

  const walletNameRef = useRef(null);
  const cryptoCurrencyRef = useRef(null);
  const walletAddressRef = useRef(null);
  const webhookUrlRef = useRef(null);

  const [validWalletName, setValidWalletName] = useState("");
  const [validCryptoCurrency, setValidCryptoCurrency] = useState("");
  const [validWalletAddress, setValidWalletAddress] = useState("");
  const [validWebhookUrl, setValidWebhookUrl] = useState("");

  const [validatingWalletName, setValidatingWalletName] = useState(false);
  const [validatingCryptoCurrency, setValidatingCryptoCurrency] = useState(
    false
  );
  const [validatingWalletAddress, setValidatingWalletAddress] = useState(false);
  const [validatingWebhookUrl, setValidatingWebhookUrl] = useState(false);

  const onFinish = (values) => {
    setIsSynching(true);
    // const userId = get(userState, "user.userId", "");
    const { wallet_name, wallet_address, webhook_url } = values;
    // TODO: the userId and walletID can leave null for now
    const data = {
      forwardingAddress: wallet_address,
      name: wallet_name,
      type: selectedCryptoCurrency,
      // userId: null,
      // walletId: null,
      webhookUrl: webhook_url,
    };
    SyncNewWallet(data)
      .then(() => {
        message.success("Sync completed");
        setIsSynching(false);
        history.push("/wallet");
      })
      .catch(() => {
        setIsSynching(false);
        setSyncingError(true);
      });
  };

  const onWalletNameChange = debounce(() => {
    setValidatingWalletName(true);
    const value = get(walletNameRef, "current.state.value", "");
    if (!isEmpty(value) && isName(value)) {
      setValidWalletName("verified");
    } else {
      setValidWalletName("failed");
      setValidatingWalletName(false);
    }
    setValidatingWalletName(false);
  }, 150);

  const onCryptoCurrencychange = (event) => {
    setValidatingCryptoCurrency(true);
    if (!isEmpty(event)) {
      setValidCryptoCurrency("verified");
    } else {
      setValidCryptoCurrency("failed");
    }
    setValidatingCryptoCurrency(false);
    setSelectedCryptoCurrency(event);
  };

  const onWalletAddressChange = debounce(() => {
    const value = get(walletAddressRef, "current.state.value", "");
    setValidatingWalletAddress(true);
    if (!isEmpty(value)) {
      const params = {
        address: value,
        type: selectedCryptoCurrency.toUpperCase(),
      };
      VerifyWalletAddress(params)
        .then(() => {
          setTimeout(() => {
            setValidatingWalletAddress(false);
            setValidWalletAddress("verified");
          }, 500);
        })
        .catch(() => {
          setValidatingWalletAddress(false);
          setValidWalletAddress("failed");
        });
    }
  }, 200);

  const onWebhookChange = debounce(() => {
    setValidatingWebhookUrl(true);
    const value = get(webhookUrlRef, "current.state.value", "");
    if (isEmpty(value) || !isUrl(value)) {
      setValidatingWebhookUrl(false);
      setValidWebhookUrl("failed");
    } else {
      setValidatingWebhookUrl(false);
      setValidWebhookUrl("verified");
    }
  }, 150);

  return (
    <div className="container mx-auto my-8">
      <Row xs={24} sm={24} md={16} lg={16} xl={16}>
        <Col span={24}>
          <div className="flex justify-start items-center">
            <Link to="/wallet" className="flex justify-start items-center">
              <LeftOutlined style={{ color: theme.colors.gray50 }} />
              <LabelLarge className="ml-4">
                Back to the previous page
              </LabelLarge>
            </Link>
          </div>
        </Col>
      </Row>
      {syncingError ||
      validWalletName === "failed" ||
      validCryptoCurrency === "failed" ||
      validWalletAddress === "failed" ||
      validWebhookUrl === "failed" ? (
        <Row className="block mt-4">
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <CustomAlert
              color={theme.colors.red}
              bgcolor="#eb575759"
              message={
                <div className="flex justify-start items-center">
                  <ErrorIcon />
                  <span className="ml-2">
                    Please check your entry and try again.
                  </span>
                </div>
              }
              type="error"
              className="my-8"
            />
          </Col>
        </Row>
      ) : null}
      <Row gutter={16} className="my-2">
        <Col span={24}>
          <H3>Sync wallet</H3>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <CustomCard padding="24px">
            <Form
              {...layout}
              name="sync-wallet-form"
              onFinish={onFinish}
              className="w-full"
            >
              <Form.Item
                name="wallet_name"
                label="Wallet Name"
                validateStatus={validWalletName === "failed" ? "error" : ""}
              >
                <div className="flex justify-between items-center">
                  <Input
                    placeholder="Enter wallet name"
                    ref={walletNameRef}
                    onChange={onWalletNameChange}
                    {...inputStyles}
                  />
                  <ValidationButton
                    valid={validWalletName}
                    isValidating={validatingWalletName}
                    className="ml-2"
                  />
                </div>
              </Form.Item>
              <Form.Item
                name="cryptocurrency"
                label="Cryptocurrency"
                validateStatus={validCryptoCurrency === "failed" ? "error" : ""}
              >
                <div className="flex justify-between items-center">
                  <Select
                    placeholder="Select a currency"
                    onChange={onCryptoCurrencychange}
                    ref={cryptoCurrencyRef}
                    allowClear
                    {...inputStyles}
                  >
                    <Option value="BITCOIN">Bitcoin</Option>
                  </Select>
                  <ValidationButton
                    valid={validCryptoCurrency}
                    isValidating={validatingCryptoCurrency}
                    className="ml-2"
                  />
                </div>
              </Form.Item>
              <Form.Item
                name="wallet_address"
                label="Wallet Address"
                extra={
                  <div className="flex justify-start items-center mt-2">
                    <InfoCircleOutlined />
                    <span className="ml-2">
                      The xPub/yPub/zPub key for the selected cryptocurrency
                    </span>
                  </div>
                }
              >
                <div className="flex justify-between items-center">
                  <Input
                    onChange={onWalletAddressChange}
                    placeholder="Enter wallet address"
                    disabled={
                      isEmpty(selectedCryptoCurrency) || validatingWalletAddress
                    }
                    ref={walletAddressRef}
                    {...inputStyles}
                  />
                  <ValidationButton
                    valid={validWalletAddress}
                    isValidating={validatingWalletAddress}
                    className="ml-2"
                  />
                </div>
              </Form.Item>
              <Form.Item
                name="webhook_url"
                label="Webhook URL"
                extra={
                  <div className="flex justify-start items-center mt-2">
                    <InfoCircleOutlined />
                    <span className="ml-2">
                      The xPub/yPub/zPub key for the selected cryptocurrency
                    </span>
                  </div>
                }
              >
                <div className="flex justify-between items-center">
                  <Input
                    onChange={onWebhookChange}
                    ref={webhookUrlRef}
                    placeholder="Enter webhook url"
                    {...inputStyles}
                  />
                  <ValidationButton
                    valid={validWebhookUrl}
                    isValidating={validatingWebhookUrl}
                    className="ml-2"
                  />
                </div>
              </Form.Item>
              <Form.Item className="flex justify-center items-center text-center">
                <CustomButton
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={isSynching}
                  disabled={
                    !validWalletName || !validWalletAddress || !validWebhookUrl
                  }
                >
                  SAVE
                </CustomButton>
              </Form.Item>
            </Form>
          </CustomCard>
        </Col>
      </Row>
    </div>
  );
};

export default SyncWalletPage;
