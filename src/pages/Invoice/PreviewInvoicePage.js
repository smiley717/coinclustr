import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Empty,
  message,
  Skeleton,
  Divider,
  Timeline,
  Dropdown,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { LeftOutlined, MoreOutlined } from "@ant-design/icons";
import get from "lodash/get";
import moment from "moment";
import { css } from "glamor";

import CustomCard from "styled/CustomCard";
import { LabelLarge, H3, BodyText } from "styled/Typography";

import { GetSingleInvoice, DeleteInvoice } from "services/InvoiceServices";

import theme from "utils/theme";

import { isEmpty, stringToPascal } from "utils/common-utils";

import ExpiredTimelineDot from "img/icons/expired-timeline-dot.svg";
import ActiveTimelineDot from "img/icons/active-timeline-dot.svg";
import InactiveTimelineDot from "img/icons/inactive-timeline-dot.svg";
import { ReactComponent as DeleteIcon } from "img/icons/delete-icon.svg";

const PROGRESS = ["CREATED", "PENDING", "RECEIVED", "COMPLETE"];

const moreIconStyling = css({
  position: "absolute",
  fontSize: "24px",
  cursor: "pointer",
  right: "16px",
  top: "16px",
  fontWeight: "bold",
});

const menuStyling = css({
  background: "white",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "rgba(13, 5, 37, 0.03) 3px 8px 40px",
});

const PreviewInvoicePage = () => {
  const { invoiceid } = useParams();
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [singleInvoiceData, setSingleInvoiceData] = useState({});

  useEffect(() => {
    if (!isEmpty(invoiceid)) {
      GetSingleInvoice(invoiceid)
        .then((res) => {
          setSingleInvoiceData(get(res, "data", {}));
          setIsFetchingData(false);
        })
        .catch(() => {
          message.error(
            "Error when fetch the invoice detail. Please try again"
          );
        });
    } else {
      setIsFetchingData(false);
      message.error("Invoice not found");
    }
  }, [invoiceid]);

  const handleDeleteInvoice = () => {
    DeleteInvoice(invoiceId)
      .then((res) => {
        message.success("Delete invoice");
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const menu = (
    <div {...menuStyling}>
      <span
        className="flex items-center justify-start cursor-pointer"
        onClick={handleDeleteInvoice}
      >
        <DeleteIcon className="mr-4" />
        <BodyText>Delete this invoice</BodyText>
      </span>
    </div>
  );

  if (isFetchingData) {
    return (
      <div className="container mx-auto my-8">
        <Skeleton />
      </div>
    );
  }

  if (!isFetchingData && isEmpty(singleInvoiceData)) {
    return (
      <div className="container mx-auto my-8">
        <Empty />
      </div>
    );
  }

  const getTimelineDot = (status, position) => {
    if (status == "EXPIRED" && position < 2) {
      return (
        <img
          src={ExpiredTimelineDot}
          className="expired-state"
          alt="Expired state"
        />
      );
    }
    if (PROGRESS.indexOf(status) >= position) {
      return (
        <img
          src={ActiveTimelineDot}
          className="active-state"
          alt="Active state"
        />
      );
    } else {
      return (
        <img
          src={InactiveTimelineDot}
          className="inactive-state"
          alt="Inactive state"
        />
      );
    }
  };

  const {
    invoiceId,
    amount,
    created,
    sendToAddress,
    serviceType,
    paymentInfo = {},
    walletInfo = {},
    status,
    statusModified,
  } = singleInvoiceData;
  return (
    <div className="container my-8 mx-auto">
      <Row gutter={24}>
        <Col span={24}>
          <Link to="/invoices" className="w-full flex items-center">
            <LeftOutlined style={{ color: theme.colors.gray50 }} />
            <LabelLarge className="ml-4">Back to the previous page</LabelLarge>
          </Link>
        </Col>
      </Row>
      <Row gutter={24} className="mt-2">
        <Col span={18}>
          <Row>
            <Col span={24}>
              <H3>Invoice details</H3>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={24} className="mt-2">
        <Col span={18}>
          <CustomCard padding="24px" display="block">
            <Dropdown overlay={menu} trigger={["click"]}>
              <MoreOutlined {...moreIconStyling} />
            </Dropdown>
            <Row gutter={24} className="w-full mb-2">
              <Col span={8} className="flex items-center justify-end">
                <LabelLarge>ID</LabelLarge>
              </Col>
              <Col span={16} className="flex justify-start items-center">
                <BodyText>{invoiceId}</BodyText>
              </Col>
            </Row>
            <Row gutter={24} className="w-full mb-2">
              <Col span={8} className="flex items-center justify-end">
                <LabelLarge>Send To Address</LabelLarge>
              </Col>
              <Col span={16} className="flex justify-start items-center">
                <BodyText>{sendToAddress}</BodyText>
              </Col>
            </Row>
            <Row gutter={24} className="w-full mb-2">
              <Col span={8} className="flex items-center justify-end">
                <LabelLarge>Wallet Name</LabelLarge>
              </Col>
              <Col span={16} className="flex justify-start items-center">
                <BodyText>
                  {" "}
                  {walletInfo.walletName || stringToPascal(serviceType)}
                </BodyText>
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
                <LabelLarge>Received</LabelLarge>
              </Col>
              <Col span={16} className="flex justify-start items-center">
                <BodyText>{paymentInfo.received || 0}</BodyText>
              </Col>
            </Row>
            <Row gutter={24} className="w-full mb-2">
              <Col span={8} className="flex items-center justify-end">
                <LabelLarge>Date of creation</LabelLarge>
              </Col>
              <Col span={16} className="flex justify-start items-center">
                <BodyText>
                  {moment(created).format("YYYY/MM/DD HH:mm:ss")}
                </BodyText>
              </Col>
            </Row>
            <Divider />
            <Row className="w-full">
              <Col span={8} offset={6}>
                <Timeline>
                  <Timeline.Item
                    dot={getTimelineDot(status, 0)}
                    className={PROGRESS.indexOf(status) >= 0 && "active-state"}
                  >
                    <div className="w-full flex flex-col">
                      <LabelLarge>Created</LabelLarge>
                      {PROGRESS.indexOf(status) == 0 ? (
                        <BodyText>
                          {moment(statusModified).format("DD/MM/YY hh:mm A")}
                        </BodyText>
                      ) : (
                        <BodyText></BodyText>
                      )}
                    </div>
                  </Timeline.Item>
                  <Timeline.Item
                    dot={getTimelineDot(status, 1)}
                    className={PROGRESS.indexOf(status) >= 1 && "active-state"}
                  >
                    <div className="w-full flex flex-col">
                      <LabelLarge>Pending</LabelLarge>
                      {PROGRESS.indexOf(status) == 1 ? (
                        <BodyText>
                          {moment(statusModified).format("DD/MM/YY hh:mm A")}
                        </BodyText>
                      ) : (
                        <BodyText></BodyText>
                      )}
                    </div>
                  </Timeline.Item>
                  <Timeline.Item
                    dot={getTimelineDot(status, 2)}
                    className={PROGRESS.indexOf(status) >= 2 && "active-state"}
                  >
                    <div className="w-full flex flex-col">
                      <LabelLarge>Received</LabelLarge>

                      {PROGRESS.indexOf(status) == 2 ? (
                        <BodyText>
                          {moment(statusModified).format("DD/MM/YY hh:mm A")}
                        </BodyText>
                      ) : (
                        <BodyText></BodyText>
                      )}
                    </div>
                  </Timeline.Item>
                  <Timeline.Item
                    dot={getTimelineDot(status, 3)}
                    className={PROGRESS.indexOf(status) >= 3 && "active-state"}
                  >
                    <div className="w-full flex flex-col">
                      <LabelLarge>Completed</LabelLarge>
                      {PROGRESS.indexOf(status) == 3 ? (
                        <BodyText>
                          {moment(statusModified).format("DD/MM/YY hh:mm A")}
                        </BodyText>
                      ) : (
                        <BodyText></BodyText>
                      )}
                    </div>
                  </Timeline.Item>
                </Timeline>
              </Col>
            </Row>
          </CustomCard>
        </Col>
      </Row>
    </div>
  );
};

export default PreviewInvoicePage;
