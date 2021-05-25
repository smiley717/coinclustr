import styled from "styled-components";
import { Tag } from "antd";

import theme from "../utils/theme";

const CustomTag = styled(Tag)`
  border-radius: 17px;
  background-color: ${(props) =>
    props.selected ? theme.colors.primaryBlueColor : theme.colors.gray20};
  color: #fff;
  font-size: 14px;
  line-height: 24px;
  padding: 2px 12px;
  display: inline-flex;
  cursor: pointer;
  .ant-tag-close-icon {
    color: #fff;
    font-weight: bold;
    font-size: 12px;
    margin-left: 10px;
    margin-top: 7px;
  }
`;

export default CustomTag;
