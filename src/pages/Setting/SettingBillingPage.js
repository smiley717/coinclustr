import React, { useEffect, useState, useCallback } from "react";
import get from "lodash/get";
import moment from "moment";

import CustomPagination from "components/custom/CustomPagination";
import { GetBillingHistory } from "services/BillingServices";
import CustomTable from "components/custom/CustomTable";

import { H3, Label } from "styled/Typography";

import { ReactComponent as ExportIcon } from "img/icons/export.svg";

import { RECORD_PER_PAGE } from "utils/Constant";

const columns = [
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    sorter: {
      compare: (a, b) => parseInt(a.amount) - parseInt(b.amount),
    },
    align: "center",
  },
  {
    title: "Date and time",
    dataIndex: "timestamp",
    key: "timestamp",
    sorter: {
      compare: (a, b) => moment(a.timestamp).isAfter(moment(b.timestamp)),
    },
    render: (timestamp) => moment(timestamp).format("YYYY/MM/DD HH:MM:SS"),
    align: "right",
  },
];

const SettingBillingPage = () => {
  const [isFetchingBillingHistory, setIsFetchingBillingHistory] = useState(
    true
  );
  const [billingHistoryData, setBillingHistoryData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchPage = useCallback((offset, pageNumber) => {
    setIsFetchingBillingHistory(true);
    const params = {
      offset: offset,
      pageNumber: pageNumber,
      pageSize: RECORD_PER_PAGE,
    };
    GetBillingHistory(params)
      .then((res) => {
        setBillingHistoryData(get(res, "data.content", []));
        setTotalRecords(get(res, "data.totalElements", 0));
        setIsFetchingBillingHistory(false);
      })
      .catch(() => {
        // message.error("Error when fetching billing history");
        setIsFetchingBillingHistory(false);
      });
  }, []);

  const handleGoToPreviousPage = () => {
    const thePreviousPage = currentPage - 1;
    fetchPage(currentPage * RECORD_PER_PAGE, thePreviousPage);
    setCurrentPage(thePreviousPage);
  };

  const handleGoToNextPage = () => {
    const theNextPage = currentPage + 1;
    fetchPage(currentPage * RECORD_PER_PAGE, theNextPage);
    setCurrentPage(theNextPage);
  };

  useEffect(() => {
    fetchPage(0, 1);
  }, [fetchPage]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-between">
        <H3>Previous Billing</H3>
        <span className="text-right flex justify-end items-center cursor-pointer">
          <Label>Export CSV</Label>
          <ExportIcon className="ml-2 mr-8" />
        </span>
      </div>
      <div className="mt-2 w-full">
        <CustomTable
          dataSource={billingHistoryData}
          columns={columns}
          pagination={false}
          loading={isFetchingBillingHistory}
        />
      </div>
      <div className="flex justify-center items-center">
        <CustomPagination
          totalRecords={totalRecords}
          currentPage={currentPage}
          numberPerPage={RECORD_PER_PAGE}
          handleGoToPreviousPage={handleGoToPreviousPage}
          handleGoToNextPage={handleGoToNextPage}
        />
      </div>
    </div>
  );
};

export default SettingBillingPage;
