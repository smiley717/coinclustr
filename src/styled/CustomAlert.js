import styled from "styled-components";
import { Alert } from "antd";

import theme from "../utils/theme";

const generateBackgroundColor = (type) => {
  if (type === "success") {
    return theme.colors.green;
  } else if (type === "error") {
    return theme.colors.red;
  } else if (type === "warning") {
    return theme.colors.primaryYellowColor;
  }
  return "#FFF";
};

const CustomAlert = styled(Alert)`
  border-radius: 3px;
  border: none;
  color: ${(props) => (props.color ? props.color : "#1C1C1C")};
  padding: ${(props) => props.padding && props.padding};
  background-color: ${(props) =>
    props.bgcolor ? props.bgcolor : generateBackgroundColor(props.type)};
  .ant-alert-close-icon {
    top: 11px !important;
    .anticon {
      font-size: 12px !important;
    }
  }

  .ant-alert-message {
    font-style: normal;
    font-weight: 600;
    line-height: 32px;
    color: ${(props) =>
    props.color ? props.color : theme.colors.menuActiveColor};
  }

  .ant-alert-description {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: ${(props) =>
    props.color ? props.color : theme.colors.alertDefaultDescriptionColor};
  }

  &.default,
  &.secondary {
    background-color: ${theme.colors.whiteColor};
    box-shadow: 3px 8px 40px rgba(13, 5, 37, 0.03);
    border-radius: 8px;

    .ant-alert-message {
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      color: ${(props) =>
    props.color ? props.color : theme.colors.menuActiveColor};
    }

    .ant-alert-description {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: ${(props) =>
        props.color ? props.color : theme.colors.alertDefaultDescriptionColor};
    }

    .ant-alert-close-icon {
      position: absolute;
      top: 15px !important;
      right: 15px;

      .anticon {
        font-size: 14px !important;

        svg {
          path {
            fill: ${theme.colors.baseTextColor};
          }
        }
      }
    }
  }

  &.default {
    .ant-alert-message {
      margin-bottom: 8px;
    }
  }

  &.secondary {
    .ant-alert-message {
      margin-bottom: 0;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: ${theme.colors.menuColor};
    }

    &.primary-color {
      .ant-alert-message {
        color: ${theme.colors.gray50};
      }
    }
  }
`;

export default CustomAlert;

export const CustomAlertDefaultRed = styled(Alert)`
  width: 504px;
  margin: 12px auto 20px auto;
  font-size: 14px;
  line-height: 20px;
  .ant-alert-message {
    color: #EB5757;
  }
`;
