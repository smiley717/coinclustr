import styled from "styled-components";
import { List } from "antd";
import theme from "../utils/theme";

export const CustomList = styled(List)`
  border-radius: 10px;
  padding: 0 32px;
  width 480px;
  border: 1px solid ${theme.colors.borderColor};
  background: ${theme.colors.whiteColor};
  ${
    ({className}) => {
      if(className) {
        return {
          background: 'none',
          border: 'none',
          textAlign: 'center',
          paddingTop: '8px'
        };
      }
    }
  }
  .ant-list-item {
    border-bottom: 1px solid ${theme.colors.borderColor};
  }
  .ant-list-item.no-border {
    border: none;
    svg {
      margin: 0 auto;
    }
  }
  .ant-list-item.no-padding {
    padding-top: 0;
    padding-bottom: 0;
  }
`;