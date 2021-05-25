import React, { useEffect, useState } from "react";
import CustomButton from "styled/CustomButton";
import { message } from "antd";
import styled from "styled-components";
import CustomModal from "styled/CustomModal";
import { BodyText, H3, LabelLarge, Subtitle } from "styled/Typography";
import { ReactComponent as CopyIcon } from "img/icons/copy.svg";
import { copyIntoClipboard } from "utils/common-utils";
import { PostTopupAddress } from 'services/BillingServices';

export const TopUpModal = ({ builtInWalletId, closeHandler }) => {
  const CustomStyledButton = styled(CustomButton)`
    margin: 0 auto; 
    width: 136px;
  `;
  const Center = styled.span`
    margin: 0 auto; 
  `;
  const title = (<div className="flex flex-col text-center">
    <H3>Top Up Form</H3>
    <Center>
      <Subtitle>You can deposit to Bitcoin builtin wallet using address bellow. </Subtitle>
    </Center>
  </div>);
  const [address, setAddress] = useState(null);
  const handleCopy = () => {
    copyIntoClipboard(address);
    message.success("Address copied");
  }

  const onError = () => {
    message.error("Something went wrong! Please try again.");
    closeHandler();
  }
  useEffect(() => {
    if (!address && builtInWalletId) {
      PostTopupAddress({
        builtInWalletId,
        type: "BITCOIN"
      }).then(({ data }) => {
        const { sendToAddress } = data;
        setAddress(sendToAddress);
      }).catch(onError);
    }
  }, []);
  return (
    <CustomModal
      title={title}
      centered
      visible
      onCancel={closeHandler}
      padding="24px"
      bodyBorderWidth
      footer={
        <div className="flex flex-row text-center mt-4">
          <CustomStyledButton
            onClick={closeHandler}
            type="primary"
            size="large"
          >
            DONE
          </CustomStyledButton>
        </div>
      }
    >
      <LabelLarge>Bitcoin builtin wallet address</LabelLarge>
      <span className="flex">
        <span className="flex-1">
          <BodyText>{address}</BodyText>
        </span>
        <CopyIcon
          className="cursor-pointer"
          onClick={handleCopy}
        />
      </span>
    </CustomModal>
  );
};
