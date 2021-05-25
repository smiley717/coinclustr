import React, { useState } from "react";
import { Row, Col } from "antd";
import moment from "moment";
import { H3 } from "styled/Typography";
import CustomTable from "components/custom/CustomTable";
import CustomPagination from "components/custom/CustomPagination";
import EmptyResultSection from "components/EmptyResultSection";
import { DATETIME_FORMAT, RECORD_PER_PAGE } from "utils/Constant";
import { isEmpty } from "utils/common-utils";
import sortIcon from "img/icons/24/basic/Artwork.svg";
import { useTopUps } from "hooks/useTopUps";
import GoBackButton from "components/GoBackButton";


const columns = [
  {
    title: () => (
      <div style={{ display: "flex", gap: "15" }}>
        <span style={{ marginRight: 20 }}>BlockChainHash</span>

        <img src={sortIcon} alt="sort" />
      </div>
    ),
    dataIndex: "blockChainHash",
    key: "blockChainHash",
    width: "200px",
    sortDirections: ["DESC", "ASC"],
    sorter: (a, b) => a.blockChainHash - b.blockChainHash,
    ellipsis: true,
  },
  {
    title: () => (
      <div style={{ display: "flex", gap: "15" }}>
        <span style={{ marginRight: 20 }}>Amount</span>

        <img src={sortIcon} alt="sort" />
      </div>
    ),
    dataIndex: "amount",
    width: "100px",
    key: "amount",
    sortDirections: ["DESC", "ASC"],
    sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
    render: (amount) => parseFloat(amount).toFixed(4),
  },
  {
    title: () => (
      <div style={{ display: "flex", gap: "15" }}>
        <span style={{ marginRight: 20 }}>Created</span>

        <img src={sortIcon} alt="sort" />
      </div>
    ),
    dataIndex: "created",
    width: "100px",
    key: "created",
    sortDirections: ["DESC", "ASC"],
    sorter: (a, b) => parseInt(a.created) - parseInt(b.created),
    render: (created) => created && moment(created).format(DATETIME_FORMAT),
  },
  {
    title: () => (
      <div style={{ display: "flex", gap: "15" }}>
        <span style={{ marginRight: 20 }}>Confirms</span>

        <img src={sortIcon} alt="sort" />
      </div>
    ),
    dataIndex: "confirms",
    width: "100px",
    key: "confirms",
    sortDirections: ["DESC", "ASC"],
    sorter: (a, b) => parseInt(a.confirms) - parseInt(b.confirms),
    render: (confirms) => parseInt(confirms),
  },
  {
    title: () => (
      <div style={{ display: "flex", gap: "15" }}>
        <span style={{ marginRight: 20 }}>Status</span>

        <img src={sortIcon} alt="sort" />
      </div>
    ),
    dataIndex: "status",
    width: "100px",
    key: "status",
    sortDirections: ["DESC", "ASC"],
    sorter: (a, b) => a.status - b.status,
  },
];

const TopUpsHistoryPage = () => {
  const {
    fetchPage,
    list,
    tableLoading,
    type,
  } = useTopUps();
  const [totalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const handleGoToPreviousPage = () => {
    const thePreviousPage = currentPage - 1;
    fetchPage(thePreviousPage);
    setCurrentPage(thePreviousPage);
  };

  const handleGoToNextPage = () => {
    const theNextPage = currentPage + 1;
    fetchPage(theNextPage);
    setCurrentPage(theNextPage);
  };

  return (
    <div className="container my-8 mx-auto">
      <Row gutter="16" className="mb-4">
        <GoBackButton url="/wallets" text="Back to previous page" />
      </Row>
      <Row gutter="16" className="mb-2">
          <H3 className="mb-0">Topup history {type}</H3>
      </Row>
      <Row>
        <Col span={24}>
          {isEmpty(list) ? (
            <div className="w-full">
              <EmptyResultSection text="No top up history available." />
            </div>
          ) : (
            <>
              <CustomTable
                dataSource={list}
                columns={columns}
                footer={null}
                pagination={false}
                bordered={false}
                loading={tableLoading}
                rowKey="blockChainHash"
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

export default TopUpsHistoryPage;
