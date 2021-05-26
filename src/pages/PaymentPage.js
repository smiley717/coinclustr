import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { css } from "glamor";
import { H3, Label } from "styled/Typography";
import CustomTable from "components/custom/CustomTable";
import SearchDropdownFilter from "components/SearchDropdownFilter";
import CustomPagination from "components/custom/CustomPagination";
import CustomRangePicker from "components/custom/CustomDateRangePicker";
import EmptyResultSection from "components/EmptyResultSection";
import { DATETIME_FORMAT, RECORD_PER_PAGE, FILTER_PAYMENT_LIST } from "utils/Constant";
import { isEmpty } from "utils/common-utils";
import { ReactComponent as BluePlusIcon } from "img/icons/blue-plus.svg";
import sortIcon from "../img/icons/24/basic/Artwork.svg";
import { useRecoilState } from "recoil";
import { paymentId } from '../recoil/payments';
import { usePayments } from "hooks/usePayments";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userFilters, selectedFilters } from "recoil/payments";




const columns = [
  {
    title: () => (
      <div style={{ display: "flex", gap: "15" }}>
        <span style={{ marginRight: 20 }}>Recipient</span>

        <img src={sortIcon} alt="sort" />
      </div>
    ),
    dataIndex: "recipient",
    key: "recipient",
    width: "25%",
    sortDirections: ["DESC", "ASC"],
    sorter: (a, b) => b.recipient.localeCompare(a.recipient),
  },
  {
    title: () => (
      <div style={{ display: "flex", gap: "15" }}>
        <span style={{ marginRight: 20 }}>Create</span>

        <img src={sortIcon} alt="sort" />
      </div>
    ),
    dataIndex: "created",
    width: "25%",
    key: "created",
    sortDirections: ["DESC", "ASC"],
    sorter: {
      compare: (a, b) => parseInt(a.created) - parseInt(b.created),
      multiple: 3,
    },
    render: (created) => moment(created).format(DATETIME_FORMAT),
  },
  {
    title: () => (
      <div style={{ display: "flex", gap: "15" }}>
        <span style={{ marginRight: 20 }}>Currency</span>

        <img src={sortIcon} alt="sort" />
      </div>
    ),
    dataIndex: "currency",
    width: "25%",
    key: "currency",
    sortDirections: ["DESC", "ASC"],
    sorter: {
      compare: (a, b) => parseInt(a.currency) - parseInt(b.currency),
      multiple: 3,
    },
  },
  {
    title: () => (
      <div style={{ display: "flex", gap: "15" }}>
        <span style={{ marginRight: 20 }}>Amount</span>

        <img src={sortIcon} alt="sort" />
      </div>
    ),
    dataIndex: "amount",
    key: "amount",
    sortDirections: ["DESC", "ASC"],
    width: "25%",
    sorter: {
      compare: (a, b) => parseInt(a.amount) - parseInt(b.amount),
      multiple: 3,
    },
    render: (amount) =>
      amount.toString().trim().startsWith("+") ? (
        <Label className="text-coinclustr-green">{amount}</Label>
      ) : (
        <Label>{amount}</Label>
      ),
  },
];

const paymentTitleStyling = css({
  "@media (max-width: 576px)": {
    minWidth: '100%',
  },
});
const paymentCreateStyling = css({
  "@media (max-width: 576px)": {
    " .date-range": {
      marginTop: '8px'
    },
    flexDirection: 'column-reverse',
    " .create-payment": {
      display: 'flex',
      minWidth: '100%',
    }
  },
});

const PaymentPage = () => {
  const {
    fetchPage,
    paymentList,
    tableLoading,
  } = usePayments();
  const [totalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [, setPaymnetId] = useRecoilState(paymentId);
  const selectedFilter = useRecoilValue(selectedFilters);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const history = useHistory();

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleGoToPreviousPage = () => {
    const thePreviousPage = currentPage - 1;
    fetchPage(
      currentPage * RECORD_PER_PAGE,
      thePreviousPage,
      startDate,
      endDate,
      selectedFilter
    );
    setCurrentPage(thePreviousPage);
  };

  const handleGoToNextPage = () => {
    const theNextPage = currentPage + 1;
    fetchPage(currentPage * RECORD_PER_PAGE, theNextPage, startDate, endDate, selectedFilter);
    setCurrentPage(theNextPage);
  };

  const handleChangeDateRange = (value) => {
    var startDateFrame = "";
    var endDateFrame = "";
    if (value != null){
      startDateFrame = value[1].format("yyyy-MM-DDTHH:mm:ss.SSS");
      endDateFrame = value[0].format("yyyy-MM-DDTHH:mm:ss.SSS");
    }
    setStartDate(startDateFrame);
    setEndDate(endDateFrame);
    setCurrentPage(0);
    fetchPage(0, 0, startDateFrame, endDateFrame, selectedFilter);
  };

  const onSubmitFilter = (values) => {
    fetchPage(currentPage * RECORD_PER_PAGE, currentPage, startDate, endDate, values);
  };

  return (
    <div className="container my-8 mx-auto">
      <Row gutter="16" className="mb-2">
        <Col xs={24} sm={24} md={6} lg={6} xl={6} {...paymentTitleStyling}>
          <H3>Payments</H3>
        </Col>
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <Row {...paymentCreateStyling}>
            <Col xs={24} sm={16} md={16} lg={16} xl={16} className="flex justify-center items-center date-range">
              <CustomRangePicker
                onChange={handleChangeDateRange}
                className="custom-range-picker pl-0"
                bordered={false}
                format="MMM DD, YYYY"
              />
            </Col>
            <Col span={8} className="create-payment">
              <div>
                <Link
                  to="/payments/create?screen=coinclustr-account"
                  className="flex items-center justify-end"
                >
                  <div className="flex items-center cursor-pointer">
                    <BluePlusIcon />
                    <Label className="ml-2">Create new payment</Label>
                  </div>
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mb-2 w-full">
        <Col span={24}>
          <SearchDropdownFilter 
          onSubmit={onSubmitFilter} 
          userFilters={userFilters} 
          selectedFilters={selectedFilters} 
          filtersList={FILTER_PAYMENT_LIST} 
          title="Payments"/>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {isEmpty(paymentList) ? (
            <div className="w-full">
              <EmptyResultSection text="No payments for chosen period" />
            </div>
          ) : (
            <>
              <CustomTable
                dataSource={paymentList}
                columns={columns}
                onChange={onChange}
                footer={null}
                pagination={false}
                bordered={false}
                loading={tableLoading}
                rowKey="invoiceId"
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => {
                      setPaymnetId(record.id);
                      history.push(`${history.location.pathname}/details`);
                    },
                  };
                }}
              />
              <Row justify="center" align="middle">
                <CustomPagination
                  totalRecords={totalRecords}
                  currentPage={currentPage}
                  numberPerPage={RECORD_PER_PAGE}
                  handleGoToPreviousPage={handleGoToPreviousPage}
                  handleGoToNextPage={handleGoToNextPage}
                />
              </Row>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PaymentPage;
