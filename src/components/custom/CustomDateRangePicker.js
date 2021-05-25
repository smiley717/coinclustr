import React from "react";
import { DatePicker } from "antd";
import styled from "styled-components";

import theme from "../../utils/theme";

const { RangePicker } = DatePicker;

const CustomDateRangePickerStyled = styled(RangePicker)`
  .ant-picker-input {
    &:nth-child(1) {
      &:before {
        content: "FROM";
        padding-right: 8px;
        font-size: 14px;
        color: ${theme.colors.gray50};
      }
    }
    &:nth-child(3) {
      &:before {
        content: "TO";
        padding-right: 8px;
        font-size: 14px;
        color: ${theme.colors.gray50};
      }
    }
  }
  .ant-picker-input:after {
    display: block;
    content: " ";
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yIDdWMTRIMTRWN0gyWk0yIDVIMTRWM0gxMkg0SDJWNVpNMTYgM0MxNiAxLjg5NTQzIDE1LjEwNDYgMSAxNCAxVjBIMTJWMUg0VjBIMlYxQzAuODk1NDMgMSAwIDEuODk1NDMgMCAzVjE0QzAgMTUuMTA0NiAwLjg5NTQzIDE2IDIgMTZIMTRDMTUuMTA0NiAxNiAxNiAxNS4xMDQ2IDE2IDE0VjNaIiBmaWxsPSIjNzk3Rjg0Ii8+Cjwvc3ZnPgo=");
    height: 16px;
    width: 30px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }
  .ant-picker-range-separator {
    visibility: hidden;
  }
`;

const CustomDateRangePicker = ({onChange}) => {
  return <CustomDateRangePickerStyled onChange={onChange} bordered={false} suffixIcon={null} />;
};

export default CustomDateRangePicker;
