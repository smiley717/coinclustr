import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, message, Dropdown } from "antd";
import { css } from "glamor";
import moment from "moment";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { useHistory } from "react-router-dom";

import { DeleteInvoice } from "services/InvoiceServices";

import { H3, Label, BodyText } from "styled/Typography";
import CustomTable from "components/custom/CustomTable";
import SearchDropdownFilter from "components/SearchDropdownFilter";
import CustomPagination from "components/custom/CustomPagination";
import CustomRangePicker from "components/custom/CustomDateRangePicker";
import EmptyResultSection from "components/EmptyResultSection";

import { GetInvoicesForWallets } from "services/WalletServices";
import {
  DATETIME_FORMAT,
  RECORD_PER_PAGE,
  FILTER_INVOICE_LIST,
} from "utils/Constant";
import { isEmpty } from "utils/common-utils";

import { ReactComponent as BluePlusIcon } from "img/icons/blue-plus.svg";
import { ReactComponent as DeleteIcon } from "img/icons/delete-icon.svg";

import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { userFilters, selectedFilters } from "recoil/invoices";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import CustomButton from "styled/CustomButton";

const menuStyling = css({
  background: "white",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "rgba(13, 5, 37, 0.03) 3px 8px 40px",
  width: "240px",
});

const invoiceTitleStyling = css({
  "@media only screen and (max-width: 576px)": {
    minWidth: '100%',
  },
});
const createInvoiceStyling = css({
  "@media only screen and (max-width: 576px)": {
    " .date-range": {
      marginTop: '8px'
    },
    flexDirection: 'column-reverse',
    " .create-invoice": {
      display: 'flex',
      minWidth: '100%',
    }
  },
});

const InvoicePage = () => {
  const history = useHistory();
  const [tableLoading, setTableLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [invoiceData, setInvoiceData] = useState([]);
  const selectedFilter = useRecoilValue(selectedFilters);
  const setSelectedFilter = useSetRecoilState(selectedFilters);
  const resetSelectedFilter = useResetRecoilState(selectedFilters);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [, setFilterList] = useState([]);
  const [selectedInvoiceID, setSelectedInvoiceID] = useState("");
  const location = useLocation();

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "invoiceId",
      key: "invoiceId",
      sorter: {
        compare: (a, b) => parseInt(a.invoiceId) - parseInt(b.invoiceId),
        multiple: 3,
      },
    },
    {
      title: "Name",
      key: "name",
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 3,
      },
      render: (text, record, index) => get(record, "serviceType", ""),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 3,
      },
    },
    {
      title: "Received",
      dataIndex: "received",
      key: "received",
      sorter: {
        compare: (a, b) => a.received - b.received,
        multiple: 3,
      },
      render: (text, record, index) => get(record, "paymentInfo.received", 0),
    },
    {
      title: "Updated",
      dataIndex: "statusModified",
      key: "statusModified",
      sorter: {
        compare: (a, b) => a.statusModified - b.statusModified,
        multiple: 3,
      },
      render: (statusModified) =>
        moment(statusModified).format(DATETIME_FORMAT),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => status,
      sorter: {
        compare: (a, b) => a.createDate - b.createDate,
        multiple: 3,
      },
    },
    {
      dataIndex: "status",
      key: "status",
      render: (status, record) => getDeleteIcon(record),
    },
  ];

  const handleDeleteInvoice = (event) => {
    event.stopPropagation();
    DeleteInvoice(selectedInvoiceID)
      .then(() => {
        message.success("Delete invoice");
        fetchPage(
          currentPage * RECORD_PER_PAGE,
          0,
          startDate,
          endDate,
          selectedFilter
        );
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const menu = (
    <div {...menuStyling}>
      <BodyText className="mb-2 block">
        Are you sure you want to delete this invoice?
      </BodyText>
      <div className="w-full flex gap-2">
        <CustomButton className="py-1 px-4 flex-1 bg-white text-coinclustr-primary-blue">
          CANCEL
        </CustomButton>
        <CustomButton
          className="py-1 px-4 flex-1"
          onClick={(event) => handleDeleteInvoice(event)}
        >
          DELETE
        </CustomButton>
      </div>
    </div>
  );

  const getDeleteIcon = (record) => {
    const { status, invoiceId } = record;
    if (status == "PENDING" || status == "EXPIRED") {
      return (
        <Dropdown overlay={menu} trigger={["click"]}>
          <DeleteIcon
            onClick={(event) => {
              event.stopPropagation();
              setSelectedInvoiceID(invoiceId);
            }}
          />
        </Dropdown>
      );
    }
    return null;
  };

  const handleGoToPreviousPage = () => {
    const thePreviousPage = currentPage - 1;
    fetchPage(
      currentPage * RECORD_PER_PAGE,
      thePreviousPage,
      startDate,
      endDate,
      selectedFilters
    );
    setCurrentPage(thePreviousPage);
  };

  const handleGoToNextPage = () => {
    const theNextPage = currentPage + 1;
    fetchPage(
      currentPage * RECORD_PER_PAGE,
      theNextPage,
      startDate,
      endDate,
      selectedFilters
    );
    setCurrentPage(theNextPage);
  };

  const fetchPage = useCallback(
    (offset, pageNo, end, start, filterBySearch) => {
      setTableLoading(true);
      console.log(filterBySearch);
      var filterBySearch = filterBySearch || "";
      const params = {
        offset,
        pageNo,
        pageSize: RECORD_PER_PAGE,
        end,
        start,
        filterBySearch,
      };
      GetInvoicesForWallets(params)
        .then((res) => {
          setInvoiceData(get(res, "data.content", ""));
          setTotalRecords(get(res, "data.totalElements", 0));
          setTableLoading(false);
        })
        .catch((res) => {
          message.error("Fetching the invoice list failed!");
        });
    },
    []
  );

  const handleChangeDateRange = (value) => {
    var startDateFrame = "";
    var endDateFrame = "";
    if (value != null) {
      startDateFrame = value[1].format("yyyy-MM-DDTHH:mm:ss.SSS");
      endDateFrame = value[0].format("yyyy-MM-DDTHH:mm:ss.SSS");
    }
    setStartDate(startDateFrame);
    setEndDate(endDateFrame);
    setCurrentPage(0);
    fetchPage(0, 0, startDateFrame, endDateFrame, selectedFilter);
  };

  const onSubmitFilter = (values) => {
    console.log(values);
    fetchPage(
      currentPage * RECORD_PER_PAGE,
      currentPage,
      startDate,
      endDate,
      values
    );
  };

  useEffect(() => {
    var predefinedStatus = get(queryString.parse(location.search), "status");

    console.log(predefinedStatus);
    var filters = [];
    if (predefinedStatus === "completed") {
      filters = ["COMPLETE"];
    } else if (predefinedStatus === "underpaid") {
      filters = ["UNDERPAID"];
    } else if (predefinedStatus === "open") {
      filters = ["PENDING", "UNDERPAID", "RECEIVED"];
    }
    if (predefinedStatus) {
      resetSelectedFilter();
      setSelectedFilter(filters);
    }
  }, [location.search]);

  return (
    <div className="container my-8 mx-auto">
      <Row gutter="16" className="mb-2">
        <Col xs={24} sm={24} md={6} lg={6} xl={6} {...invoiceTitleStyling}>
          <H3>Invoices</H3>
        </Col>
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <Row {...createInvoiceStyling}>
            <Col xs={24} sm={16} md={16} lg={16} xl={16} className="flex justify-center items-center date-range">
              <CustomRangePicker
                onChange={handleChangeDateRange}
                className="custom-range-picker pl-0"
                bordered={false}
                format="MMM DD, YYYY"
              />
            </Col>
            <Col span={8} className="create-invoice">
              <div>
                <Link to="/invoices/create" className="flex items-center justify-end">
                  <BluePlusIcon />
                  <Label className="ml-2">Create invoice</Label>
                </Link>
                {/* <SearchOutlined className="ml-4" {...searchStyling} /> */}
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
            filtersList={FILTER_INVOICE_LIST}
            title="Invoices"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {isEmpty(invoiceData) ? (
            <div className="w-full">
              <EmptyResultSection text="No invoices yet" />
            </div>
          ) : (
            <>
              <CustomTable
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      const { invoiceId } = record;
                      history.push(`invoices/${invoiceId}`);
                    },
                  };
                }}
                dataSource={invoiceData}
                columns={columns}
                onChange={onChange}
                footer={null}
                pagination={false}
                loading={tableLoading}
                rowKey="invoiceId"
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

export default InvoicePage;
