import React from "react";
import { Modal } from "antd";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

import { H3, Subtitle } from "styled/Typography";
import theme from "utils/theme";

const ModalStyled = styled(Modal)`
  .ant-modal-content {
    background: #ffffff;
    box-shadow: 3px 8px 40px rgba(13, 5, 37, 0.03);
    border-radius: 8px;
  }
`;

const StatusTopBarStyled = styled.span`
  display: block;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 8px;
  border-radius: 8px 8px 0px 0px;
  opacity: 0.3;
  ${({ status }) =>
    status === "success" &&
    `
      background: ${theme.colors.green};
    `}
  ${({ status }) =>
    status === "error" &&
    `
      background: ${theme.colors.red};
    `}
`;

const CustomModal = (props) => {
  const {
    visible,
    heading = "",
    onCancel,
    children,
    status = "normal",
    loader = { visible: false, title: "loading..." },
  } = props;
  return (
    <ModalStyled
      destroyOnClose={true}
      centered
      maskStyle={{
        background: "rgba(5, 52, 116, 0.3)",
        backdropFilter: "saturate(180%) blur(1px)",
      }}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      title={null}
      className="text-center relative"
      heading="Modal heading"
      {...props}
    >
      {loader.visible && (
        <div className="bg-opacity-60 bg-white w-full h-full flex justify-center items-center absolute top-0 left-0">
          <div className="flex flex-col justify-center items-center">
            <LoadingOutlined className="text-coinclustr-primary-blue mb-6 text-5xl" />
            <Subtitle>{loader.title}</Subtitle>
          </div>
        </div>
      )}
      {status === "success" && <StatusTopBarStyled status="success" />}
      {status === "error" && <StatusTopBarStyled status="error" />}
      <H3 className="my-4">{heading}</H3>
      {children}
    </ModalStyled>
  );
};

export default CustomModal;
