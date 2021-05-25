import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Empty, Divider } from "antd";
import get from "lodash/get";
import { LoadingOutlined } from "@ant-design/icons";

import CircleColorIcon from "components/CircleColorIcon";

import { GetBuiltInWallets } from "services/WalletServices";

import { BodyText } from "styled/Typography";

import { isEmpty } from "utils/common-utils";

import { ReactComponent as ErrorIcon } from "img/icons/error.svg";
import { ReactComponent as ArrowDownIcon } from "img/icons/arrow-down-icon.svg";
import { ReactComponent as BitcoinYellowIcon } from "img/icons/bitcoin-yellow.svg";

const BuiltInWalletSelect = ({
  onChange,
  status = { status: "normal", message: "" },
  className = "",
  preSelectedWallet = null
}) => {
  const [walletList, setWalletList] = useState([]);
  const [isFetchingList, setIsFetchingList] = useState(true);
  const [selectedWallet, setSelectedWallet] = useState({});

  useEffect(() => {
    GetBuiltInWallets()
      .then(async (res) => {
        const walletListData = get(res, "data", []);
        setWalletList(walletListData);
        setIsFetchingList(false);
        if(preSelectedWallet) {
          handleSelectWallet(preSelectedWallet);
        }
      })
      .catch(() => {
        setIsFetchingList(false);
      });
  }, []);

  const handleSelectWallet = (item) => {
    setSelectedWallet(item);
    if (onChange) {
      onChange(item);
    }
  };

  const menu = isEmpty(walletList) ? (
    <div className="w-full flex justify-center items-center p-3 bg-white rounded-md">
      <Empty />
    </div>
  ) : (
    <Menu>
      {walletList.map((item) => {
        const { walletId, type } = item;
        return (
          <Menu.Item key={walletId}>
            <div
              className="w-full px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectWallet(item)}
            >
              <span className="flex items-center justify-between">
                <span>
                  <BodyText className="m-0">{type}</BodyText>
                </span>
                <CircleColorIcon
                  className="bg-coinclustr-orange"
                  width="25px"
                  height="25px"
                  iconWidth="13px"
                  iconHeight="13px"
                >
                  <BitcoinYellowIcon />
                </CircleColorIcon>
              </span>
              {walletList.length > 1 && <Divider className="m-0" />}
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const { usdPrice, type } = selectedWallet;
  return (
    <div className="w-full">
      <Dropdown overlay={menu} trigger={["click"]}>
        <span
          role="button"
          className={`${
            status.status === "error"
              ? "border-coinclustr-red"
              : "border-coinclustr-gray-bordered"
          } border rounded-md w-full flex justify-between items-center px-4 py-2 ${className}`}
        >
          {!isEmpty(selectedWallet) ? (
            <span>
              <BodyText className="ml-0">{type}</BodyText>
            </span>
          ) : (
            <BodyText>Select builtin wallet</BodyText>
          )}
          <span className="flex">
            <span className="border border-coinclustr-gray-bordered"></span>
            {isFetchingList && isEmpty(selectedWallet) ? (
              <LoadingOutlined className="ml-6" />
            ) : !isFetchingList && isEmpty(selectedWallet) ? (
              <ArrowDownIcon className="ml-6" />
            ) : (
              <span className="flex items-center ml-2">
                <CircleColorIcon
                  className="bg-coinclustr-orange mr-2"
                  width="25px"
                  height="25px"
                  iconWidth="13px"
                  iconHeight="13px"
                >
                  <BitcoinYellowIcon />
                </CircleColorIcon>
                <ArrowDownIcon className="ml-1" />
              </span>
            )}
          </span>
        </span>
      </Dropdown>
      {!isEmpty(get(status, "message", "")) && (
        <span className="flex w-full items-center justify-center my-2">
          <ErrorIcon />
          <span className="text-coinclustr-red ml-2">{status.message}</span>
        </span>
      )}
    </div>
  );
};

export default BuiltInWalletSelect;
