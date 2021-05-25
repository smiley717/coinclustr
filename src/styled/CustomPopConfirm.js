import React from "react";
import { Popconfirm } from "antd";
import styled from "styled-components";

import { BodyText } from "styled/Typography";

const PopConfirmStyled = styled(Popconfirm)`
  .ant-popover-arrow {
    display: none !important;
  }
`;

const CustomPopConfirm = ({ title, children }) => {
  return (
    <PopConfirmStyled
      placement="bottom"
      icon={null}
      title={<BodyText>{title}</BodyText>}
    >
      {children}
    </PopConfirmStyled>
  );
};

export default CustomPopConfirm;
