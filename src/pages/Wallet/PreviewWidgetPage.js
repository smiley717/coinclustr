import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Form,
  Popover,
  Divider,
  Table,
  Empty,
  message,
} from "antd";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  LeftOutlined,
  MoreOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { css } from "glamor";
import get from "lodash/get";

import CustomCard from "styled/CustomCard";
import { LabelLarge, H3, H4, BodyText, Subtitle } from "styled/Typography";
import CustomButton from "styled/CustomButton";

import { GetSingleDetailWidget, DeleteWidget } from "services/WalletServices";

import CustomPagination from "components/custom/CustomPagination";

import { copyIntoClipboard, isEmpty } from "utils/common-utils";
import theme from "utils/theme";

import { ReactComponent as QRCode } from "img/icons/qr-code.svg";
import { ReactComponent as CopyIcon } from "img/icons/copy.svg";
import { ReactComponent as EditWalletIcon } from "img/icons/edit-wallet.svg";
import { ReactComponent as DeleteWallet } from "img/icons/delete-wallet.svg";
import { ReactComponent as BitcoinFlatIcon } from "img/icons/bitcoin-flat.svg";

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

const dropDownStyling = css({
  borderRadius: "8px",
});

const formPreviewLayout = {};

const dataSource = [
  {
    key: "1",
    action: "sign out",
    username: "test@test.com",
    source: "Chrome (Mac)",
    ip_address: "46.211.34.123",
    date_and_time: "2020/10/07 10:20:28",
  },
  {
    key: "2",
    action: "device confirmation completed",
    username: "test@test.com",
    source: "Chrome (Mac)",
    ip_address: "46.211.34.123",
    date_and_time: "2020/10/07 10:20:28",
  },
  {
    key: "3",
    action: "phone verified",
    username: "test@test.com",
    source: "Chrome (Mac)",
    ip_address: "46.211.34.123",
    date_and_time: "2020/10/07 10:20:28",
  },
  {
    key: "4",
    action: "phone added",
    username: "test@test.com",
    source: "Chrome (Mac)",
    ip_address: "46.211.34.123",
    date_and_time: "2020/10/07 10:20:28",
  },
];

const columns = [
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
  },
  {
    title: "IP Address",
    dataIndex: "ip_address",
    key: "ipaddress",
  },
  {
    title: "Date and time",
    dataIndex: "date_and_time",
    key: "date_and_time",
  },
];

const PreviewWidgetPage = () => {
  const [previewForm] = Form.useForm();
  const { walletid, widgetid } = useParams();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [widgetDetailData, setWidgetDetailData] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (!isEmpty(walletid) && !isEmpty(widgetid)) {
      GetSingleDetailWidget(walletid, widgetid)
        .then((res) => {
          setWidgetDetailData(get(res, "data", {}));
          setIsFetchingData(false);
        })
        .catch(() => {
          message.error("Error when fetch the widget detail. Please try again");
        });
    } else {
      setIsFetchingData(false);
      message.error("Widget not found");
    }
  }, [walletid, widgetid]);

  const handleGoToPreviousPage = () => {
    alert("Previous page");
  };

  const handleGoToNextPage = () => {
    alert("Next page");
  };

  const DeleteThisWidget = () => {
    DeleteWidget()
      .then((res) => {
        message.success("Deleted");
        history.push("/wallet");
      })
      .catch(() => {
        message.error("Error when delete this widget. Please try again");
      });
  };

  const menu = (
    <div {...dropDownStyling}>
      <span className="flex items-center">
        <Link
          className="flex items-center"
          to={`/wallet/${walletid}/widget/${widgetid}/edit`}
        >
          <EditWalletIcon className="mr-2" />
          <BodyText>Edit wallet</BodyText>
        </Link>
      </span>
      <Divider style={{ margin: "8px 0px" }} />
      <span
        className="flex items-center cursor-pointer"
        onClick={DeleteThisWidget}
      >
        <DeleteWallet className="mr-2" />
        <BodyText>Delete wallet</BodyText>
      </span>
    </div>
  );

  const handleDropdownVisibleChange = (visible) => {
    setDropdownVisible(visible);
  };

  if (!isFetchingData && isEmpty(widgetDetailData)) {
    return (
      <div className="container mx-auto my-8">
        <Empty />
      </div>
    );
  }

  const {
    widgetName,
    amount,
    // widgetPaymentType,
    widgetTitle,
    widgetDescription,
    codeSnippet,
  } = widgetDetailData;
  return (
    <div className="container my-8 mx-auto">
      <Row gutter={24}>
        <Col span={24}>
          <Link to="/wallet" className="w-full flex items-center">
            <LeftOutlined style={{ color: theme.colors.gray50 }} />
            <LabelLarge className="ml-4">Back to the previous page</LabelLarge>
          </Link>
        </Col>
      </Row>
      <Row gutter={24} className="mt-2">
        <Col span={18}>
          <Row>
            <Col span={12}>
              <H3>{widgetName}</H3>
            </Col>
            <Col span={12} className="flex justify-end items-center">
              <Popover
                content={menu}
                trigger="click"
                placement="bottom"
                visible={dropdownVisible}
                onVisibleChange={handleDropdownVisibleChange}
              >
                <MoreOutlined />
              </Popover>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <H4 className="text-center">Preview</H4>
        </Col>
      </Row>
      <Row gutter={24} className="mt-2">
        <Col span={18}>
          <CustomCard padding="24px" display="block">
            <Row gutter={24} className="w-full mb-2">
              <Col span={8} className="flex items-center justify-end">
                <LabelLarge>To the wallet</LabelLarge>
              </Col>
              <Col span={16} className="flex justify-start items-center">
                <BitcoinFlatIcon className="mr-2" />
                <BodyText>BTC (Bitcoin)</BodyText>
              </Col>
            </Row>
            <Row gutter={24} className="w-full mb-2">
              <Col span={8} className="flex items-center justify-end">
                <LabelLarge>Amount</LabelLarge>
              </Col>
              <Col span={16} className="flex justify-start items-center">
                <BodyText> {amount}</BodyText>
              </Col>
            </Row>
            <Row gutter={24} className="w-full mb-2">
              <Col span={8} className="flex items-center justify-end">
                <LabelLarge>Widget title</LabelLarge>
              </Col>
              <Col span={16} className="flex justify-start items-center">
                <BodyText> {widgetTitle}</BodyText>
              </Col>
            </Row>
            <Row gutter={24} className="w-full mb-2">
              <Col span={8} className="flex items-center justify-end">
                <LabelLarge>Widget description</LabelLarge>
              </Col>
              <Col span={16} className="flex justify-start items-center">
                <BodyText> {widgetDescription}</BodyText>
              </Col>
            </Row>
            <Row gutter={24} className="w-full mb-2">
              <Col span={8} className="flex items-start justify-end">
                <LabelLarge>HTML code</LabelLarge>
              </Col>
              <Col span={16} className="flex justify-start">
                <Form.Item
                  className="w-full"
                  help={
                    <div className="mt-2 flex items-center">
                      <InfoCircleOutlined className="mr-2" />
                      <span>Enter wallet for collecting payments</span>
                    </div>
                  }
                >
                  <Input
                    className="empty-addon-after"
                    placeholder="Wallet address"
                    value={codeSnippet}
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
              </Col>
            </Row>
            <Row gutter={24} className="w-full mb-2">
              <Col span={8} className="flex items-center justify-end">
                <LabelLarge>Download QR code</LabelLarge>
              </Col>
              <Col span={16} className="flex justify-start items-center">
                <CustomButton type="primary" size="large" className="outline">
                  DOWNLOAD
                </CustomButton>
              </Col>
            </Row>
          </CustomCard>
        </Col>
        <Col span={6}>
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
      <Row gutter={16} className="mt-2">
        <Col span={18}>
          <H3>Widget history</H3>
          <Subtitle>Recent activity with widget</Subtitle>
        </Col>
      </Row>
      {/* TODO: still need the history for this case */}
      <Row gutter={16} className="mt-4">
        <Col span={18}>
          <Row>
            <Col span={24}>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <CustomPagination
              totalRecords={47}
              currentPage={10}
              numberPerPage={5}
              handleGoToPreviousPage={handleGoToPreviousPage}
              handleGoToNextPage={handleGoToNextPage}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PreviewWidgetPage;
