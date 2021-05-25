import styled from "styled-components";
import { Input, InputNumber } from "antd";

import theme from "../utils/theme";

const CustomInput = styled(Input)`
  border: 1px solid ${theme.colors.borderColor};
  box-sizing: border-box;
  border-radius: 6px;
  height: 40px;
  input {
    height: 40px;
  }
`;

export const CustomInputNumber = styled(InputNumber)`
  border: 1px solid ${theme.colors.borderColor};
  box-sizing: border-box;
  border-radius: 6px;
  width: 100%;
  input {
    height: 40px;
  }
`;

export default CustomInput;
