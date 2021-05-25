import styled from "styled-components";
import { Modal } from "antd";

// import theme from "../utils/theme";

const CustomModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 8px;
    ${({padding}) => ({
      ...(padding ? {padding} : {})
    })}
    ${({bodyBorderWidth}) => ({
      ...(bodyBorderWidth ? {
        border: "1px solid #CED3D7",
        borderColor: "#CED3D7",
        borderWidth: "1px 0"
      } : {})
    })}
    h3.title {
      font-family: ${(props) => props.theme.fonts.primaryFont};
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 32px;
      letter-spacing: 0px;
      text-align: center;
      color: rgba(69, 72, 76, 1);
    }
    p {
      font-family: ${(props) => props.theme.fonts.primaryFont};
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: center;
      color: rgba(138, 145, 151, 1);
    }
    .center {
      margin: 0px auto;
      text-transform: uppercase;
      padding-left: 24px;
      padding-right: 24px;
      border-radius: 8px;
      justify-content: center;
      display: flex;
      margin-top: 16px;
    }
    .ant-modal-header {
      border-radius: 8px 8px 0px 0px;
    }
  }
`;

export default CustomModal;
