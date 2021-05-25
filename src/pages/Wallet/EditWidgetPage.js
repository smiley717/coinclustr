import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Form,
  Select,
  Radio,
  Skeleton,
  message,
  Empty,
} from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { css } from "glamor";
import get from "lodash/get";
import { useHistory, useParams } from "react-router-dom";

import CustomCard from "../../styled/CustomCard";
import { LabelLarge, H3, Subtitle, H4 } from "../../styled/Typography";
import CustomButton from "../../styled/CustomButton";

import theme from "../../utils/theme";
import { copyIntoClipboard, isEmpty } from "utils/common-utils";
import {
  EditWidget,
  GetSingleDetailWidget,
} from "../../services/WalletServices";

import { ReactComponent as QRCode } from "../../img/icons/qr-code.svg";
import { ReactComponent as CopyIcon } from "../../img/icons/copy.svg";

const headerStyling = css({
  backgroundColor: theme.colors.blueIconColor,
  color: "#fff",
  borderRadius: "8px 8px 0px 0px",
  textAlign: "center",
  padding: "8px",
});

const previewCardStyling = css({
  backgroundColor: "#fff",
  padding: "16px",
});

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const formPreviewLayout = {};

const { Option } = Select;

const EditWidgetPage = () => {
  const history = useHistory();
  const { walletid, widgetid } = useParams();
  const [isFetchingDetailWallet, setIsFetchingDetailWallet] = useState(true);
  const [detailWalletData, setDetailWalletData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewForm] = Form.useForm();

  const onFinish = (values) => {
    setIsSubmitting(true);
    // append the wallet category to the request data
    const request_data = {
      ...values,
      walletCategory: get(detailWalletData, "category", ""),
    };
    EditWidget(request_data, walletid, widgetid)
      .then(() => {
        setIsSubmitting(false);
        history.push("/wallet");
        message.success("Edit widget successful!");
      })
      .catch(() => {
        message.error("Error when edit widget. Please try again");
        setIsSubmitting(false);
      });
  };

  const onFinishFailed = () => {
    message.error("Error when edit widget. Please try again");
  };

  const selectCoinListAfter = (
    <Select defaultValue="BTC" className="select-after">
      <Option value="BTC">BTC</Option>
    </Select>
  );

  useEffect(() => {
    GetSingleDetailWidget(walletid)
      .then((res) => {
        setDetailWalletData(get(res, "data", {}));
        setIsFetchingDetailWallet(false);
      })
      .catch(() => {
        message.error("Wallet detail not found");
      });
  }, [walletid]);

  if (!isFetchingDetailWallet && isEmpty(detailWalletData)) {
    return (
      <div className="container mx-auto my-8">
        <Empty />
      </div>
    );
  }

  if (isFetchingDetailWallet) {
    return (
      <div className="container mx-auto my-8">
        <Skeleton />
      </div>
    );
  }

  const {
    widgetName,
    amount,
    widgetPaymentType,
    widgetTitle,
    widgetDescription,
  } = detailWalletData;
  console.log(detailWalletData);
  return (
    <div className="container mx-auto my-8">
      <Row gutter={16}>
        <Col span={24}>
          <Link to="/wallet" className="flex justify-start items-center">
            <LeftOutlined style={{ color: theme.colors.gray50 }} />
            <LabelLarge className="ml-4">Back to the previous page</LabelLarge>
          </Link>
        </Col>
      </Row>
      <Row gutter={16} className="mt-2">
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <H3>Edit widget</H3>
          <Subtitle className="mb-4">
            Want to get payments on your website or app? Integrate Coinclustr
            widget.
          </Subtitle>
        </Col>
        <Col
          xs={0}
          sm={0}
          md={6}
          lg={6}
          xl={6}
          className="hidden sm:hidden md:block"
        >
          <H4 className="text-center">Preview</H4>
        </Col>
      </Row>
      <Row gutter={16} className="mt-2">
        <Col xs={24} sm={24} md={18} lg={18}>
          <CustomCard padding="24px" className="mb-16">
            <Form
              {...layout}
              name="basic"
              initialValues={{
                price: "FIXED_PRICE",
                to_the_wallet: walletid,
                amount: amount,
                widget_name: widgetName,
                price_group: widgetPaymentType,
                widget_title: widgetTitle,
                widget_description: widgetDescription,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="w-full form-center"
            >
              <Form.Item
                label="Widget name"
                name="widget_name"
                rules={[
                  { required: true, message: "Please input widget name" },
                ]}
                help={<div className="mt-2">Not necessary</div>}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="To the wallet"
                name="to_the_wallet"
                rules={[{ required: true, message: "Please input wallet" }]}
                help={
                  <div className="flex justify-start items-center mt-2">
                    <InfoCircleOutlined className="mr-2" />
                    <span>Enter wallet for collecting payments</span>
                  </div>
                }
              >
                <Input disabled addonAfter={selectCoinListAfter} />
              </Form.Item>

              <Col span={20} offset={5}>
                <Form.Item label="" name="price">
                  <Radio.Group name="price_group">
                    <Radio style={radioStyle} value="FIXED_PRICE">
                      Fixed Price
                    </Radio>
                    <Radio style={radioStyle} value="ANY_PRICE">
                      Any Price
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, message: "Please input amount" }]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Widget title"
                name="widget_title"
                rules={[
                  { required: true, message: "Please input widget title" },
                ]}
                help={<div className="mt-2">Not necessary</div>}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Widget description"
                name="widget_description"
                rules={[
                  {
                    required: true,
                    message: "Please input widget description",
                  },
                ]}
                help={<div className="mt-2">Not necessary</div>}
              >
                <Input />
              </Form.Item>

              <Form.Item className="flex justify-center items-center text-center">
                <CustomButton
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={isSubmitting}
                >
                  Submit
                </CustomButton>
              </Form.Item>
            </Form>
          </CustomCard>
        </Col>
        <Col xs={18} sm={18} md={6} lg={6} className="mx-auto">
          <Col
            xs={24}
            sm={24}
            md={6}
            lg={6}
            xl={6}
            className="block sm:block md:hidden"
          >
            <H4 className="text-center w-full flex justify-center items-center my-8">
              Preview
            </H4>
          </Col>
          <div {...headerStyling}>Test title</div>
          <div {...previewCardStyling}>
            <Form
              form={previewForm}
              layout={formPreviewLayout}
              initialValues={{
                amount_due: "0.000959",
                wallet_address: "jjKjnjKJ/?>mlkjjkJJn",
              }}
            >
              <Form.Item label="Amount Due" name="amount_due">
                <Input
                  className="empty-addon-after"
                  placeholder="Amount Due"
                  addonAfter={
                    <CopyIcon
                      className="cursor-pointer"
                      onClick={() =>
                        copyIntoClipboard(
                          previewForm.getFieldValue("amount_due")
                        )
                      }
                    />
                  }
                />
              </Form.Item>
              <Form.Item label="Address" name="wallet_address">
                <Input
                  className="empty-addon-after"
                  placeholder="Wallet address"
                  addonAfter={
                    <CopyIcon
                      className="cursor-pointer"
                      onClick={() =>
                        copyIntoClipboard(
                          previewForm.getFieldValue("wallet_address")
                        )
                      }
                    />
                  }
                />
              </Form.Item>
            </Form>
            <QRCode className="block mx-auto" />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default EditWidgetPage;
