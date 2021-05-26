import { Card } from "antd";
import styled from "styled-components";

import theme from "../utils/theme";

export const CardHeading = styled.h3`
  margin: 0;
  padding: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: ${theme.colors.menuActiveColor};
`;

const CustomCard = styled(Card)`
  display: ${(props) => (props.display ? props.display : "flex")};
  align-items: center;
  padding: ${(props) => (props.padding ? props.padding : "16px")};
  background: ${(props) =>
    props.background ? props.background : theme.colors.white};
  border: 1px solid
    ${(props) =>
      props.cardbordercolor
        ? props.cardbordercolor
        : theme.colors.cardBorderColor};
  border-radius: 8px;

  .ant-card-body {
    display: ${(props) => (props.display ? props.display : "flex")};
    align-items: ${(props) => (props.alignitems ? props.alignitems : "center")};
    justify-content: ${(props) =>
      props.justifycontent ? props.justifycontent : "flex-start"};
    width: 100%;
    padding: ${(props) => (props.padding ? props.padding : 0)};
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: ${theme.colors.baseTextColor};
    ::before,
    ::after {
      content: ${(props) => (props.prefix ? props.prefix : " ")};
      display: ${(props) => (props.prefix ? props.prefix : "table")};
    }
  }
`;

export default CustomCard;

export const CustomCardExtended = styled(CustomCard)`
  width: 504px;
  border-radius: 10px;
  .submit-button-wrapper {
    .ant-form-item-control-input-content {
      justify-content: center;
      display: flex;
    }
  }
`;


export const CustomPaymentCard = styled(CustomCard)`
  @media (max-width: 576px) {
    width: calc(100vw - 24px);
  }
  width: 504px;
  border-radius: 10px;
  .submit-button-wrapper {
    .ant-form-item-control-input-content {
      justify-content: center;
      display: flex;
    }
  }
`;