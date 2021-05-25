import React from "react";

import { Row, Col } from "antd";

const PageHeader = ({ leftColumn, rightColumn }) => {
  return (
    <Row
      justify="space-between"
      style={{
        padding: "48px 0px",
        backgroundColor: "transparent",
      }}
    >
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        className="flex justify-start items-center"
        style={{ marginBottom: "15px" }}
      >
        {leftColumn}
      </Col>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        style={{ marginBottom: "15px" }}
        className="flex justify-end items-center"
      >
        {rightColumn}
      </Col>
    </Row>
  );
};

export default PageHeader;
