import { Button } from "antd";
import styled from "styled-components";

import theme from "../utils/theme";

const CustomButton = styled(Button)`
  height: auto;
  background: ${theme.colors.primaryBlueColor};
  border-radius: 8px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 32px;
  padding: 4px 28px;
  color: ${theme.colors.whiteColor};

  &.text-uppercase {
    text-transform: uppercase;
  }

  &.outline {
    background-color: transparent;
    border-color: ${theme.colors.primaryBlueColor};
    color: ${theme.colors.primaryBlueColor};
  }

  &.transparent {
    font-size: 14px;
    line-height: 24px;
    color: ${theme.colors.gray20};
    background: transparent;
    border-color: transparent;
    box-shadow: none;

    &:hover,
    &:focus,
    &:active,
    &.active {
      background: ${theme.colors.primaryBlueColor};
      color: ${theme.colors.whiteColor};
    }
  }
`;

export default CustomButton;
