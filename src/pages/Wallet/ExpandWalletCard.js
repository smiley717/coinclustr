import React, { useState, useEffect } from "react";
import { css } from "glamor";
import { MoreOutlined } from "@ant-design/icons";
import {Dropdown, Divider, Empty, message, Skeleton, Row, Col} from "antd";
import { Link } from "react-router-dom";
import get from "lodash/get";
import styled from "styled-components";
import CustomCard from "styled/CustomCard";
import { BodyText, BigText, H3, H4, Label } from "styled/Typography";

import { GetSingleWalletDetail } from "services/WalletServices";
import { ConvertCoinToCurrency, GetMarketInfo } from "services/MarketServices";
import {
  isEmpty,
  numberWithCommas,
  stringToPascal,
  roundNumber,
} from "utils/common-utils";

import { ReactComponent as EditWalletIcon } from "img/icons/edit-wallet.svg";
import { ReactComponent as TopUpHistory } from "img/icons/top-up-history.svg";
import { ReactComponent as TopUpWallet } from "img/icons/top-up-wallet.svg";
import { ReactComponent as BitcoinFlatIcon } from "img/icons/bitcoin-orange.svg";

import { btcPrice } from "../../axios_mock/WalletServiceStub";
import { TopUpModal } from "components/modal/TopUpModal";

const BalanceIcon = styled.div`
  float:left;
  display:inline-block;
  width: 64px;
  height: 100%;
`

const BalanceContent = styled.div`
  float:left;
  display: inline-block;
  width: calc(100% - 100px);
  height: 100%;
`

const moreIconStyling = css({
  position: "absolute",
  fontSize: "24px",
  cursor: "pointer",
  right: "16px",
  top: "16px",
  fontWeight: "bold",
});

const menuStyling = css({
  background: "white",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "rgba(13, 5, 37, 0.03) 3px 8px 40px",
});

const walletPanelStyling = css({
  background: "white",
  padding: "25px",
  borderRadius: "8px",
  boxShadow: "rgba(13, 5, 37, 0.03) 3px 8px 40px",
});

const ExpandWalletCard = ({ selectedWallet, view }) => {
  const [walletDetail, setWalletDetail] = useState({});
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [price] = useState(btcPrice);
  const [usdPrice, setUsdPrice] = useState(0);
  const [marketPrice, setMarketPrice] = useState(0);
  const [dayChange, setDayChange] = useState(0);
  const [topupModalVisible, setTopUpModalVisible] = useState(false);
  useEffect(() => {
    if (!isEmpty(selectedWallet)) {
      setIsContentLoading(true);
      GetSingleWalletDetail(selectedWallet)
        .then((res) => {
          setWalletDetail(get(res, "data", {}));
          const data = {
            amount: get(res, "data.confirmedBalance", 0),
            coin: "BITCOIN",
            currency: "USD",
          };
          ConvertCoinToCurrency(data).then((responses) => {
            setUsdPrice(get(responses, "data.convertedValue", 0));
          });
          GetMarketInfo().then((responses) => {
            setMarketPrice(get(responses, "data.[0].current_price", 0));
            setDayChange(
              get(responses, "data.[0].price_change_percentage_24h", 0)
            );
          });
          setIsContentLoading(false);
        })
        .catch(() => {
          message.error("Error when fetch wallet detail");
        });
    }
  }, [selectedWallet]);

  const menu = (
    <div {...menuStyling}>
      <span className="flex items-center justify-start">
        <EditWalletIcon className="mr-4" />
        <BodyText>Edit wallet</BodyText>
      </span>
      <Divider className="p-0 my-2" />
      <span className="flex items-center">
        <span
          className="flex items-center justify-start"
          role="button"
          onClick={() => setTopUpModalVisible(true)}
        >
          <TopUpWallet className="mr-4" />
          <BodyText>Top Up Wallet</BodyText>
        </span>
      </span>
      <Divider className="p-0 my-2" />
      <span className="flex items-center">
        <Link
          to={`/wallet/${selectedWallet}/topups`}
          className="flex items-center justify-start"
        >
          <TopUpHistory className="mr-4" />
          <BodyText>Top Up History</BodyText>
        </Link>
      </span>
      {/* <Divider className="p-0 my-2" />
      <span className="flex items-center justify-start">
        <DeleteWallet className="mr-4" />
        <BodyText>Delete wallet</BodyText>
      </span>  */}
    </div>
  );

  if (isEmpty(selectedWallet)) {
    return (
      <CustomCard display="block" padding="16px">
        <Empty />
      </CustomCard>
    );
  }

  if (isContentLoading) {
    return (
      <CustomCard display="block" padding="16px">
        <Skeleton />
      </CustomCard>
    );
  }

  const { type, confirmedBalance } = walletDetail;
  return (
    <CustomCard
      display="block"
      background={view === "mobile" ? "#F5F7FA" : null}
      {...walletPanelStyling}
    >
      <Dropdown overlay={menu} trigger={["click"]}>
        <MoreOutlined {...moreIconStyling} />
      </Dropdown>
      <div className="w-full">
        <Label className="mb-4 text-coinclustr-gray-40 block">
          Current Balance
        </Label>
        <>
          <BalanceIcon>
            <BitcoinFlatIcon style={{ width: "64px", height: "64px" }} />
          </BalanceIcon>
          <BalanceContent>
            <Row className="w-full">
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className="ml-4 flex flex-col">
                  <BigText className="text-capitalize text-coinclustr-gray-50">
                    {stringToPascal(type)}
                  </BigText>
                  <div className="flex items-baseline">
                    <Label className="text-coinclustr-gray-40">BTC</Label>
                    <H3 className="m-0 ml-2 text-coinclustr-gray-60">{`${confirmedBalance} BTC`}</H3>
                  </div>
                  <div className="flex items-baseline">
                    <Label className="text-coinclustr-gray-40">USD</Label>
                    <Label className="m-0 ml-2 text-coinclustr-gray-40">{`$${numberWithCommas(
                      confirmedBalance * marketPrice
                    )}`}</Label>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                <div className="ml-4 flex flex-col">
                  <Label className="text-coinclustr-gray-40 leading-8">
                    Market Price
                  </Label>
                  <H3 className="m-0 text-coinclustr-gray-60">{`$${numberWithCommas(
                    marketPrice
                  )}`}</H3>
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                <div className="ml-4 flex flex-col">
                  <Label className="text-coinclustr-gray-40 leading-8">
                    Day Change
                  </Label>
                  {Math.sign(dayChange) === -1 || Math.sign(dayChange) === -0 ? (
                    <H3 className="m-0 text-coinclustr-red">{`↓ ${roundNumber(
                      dayChange
                    )}%`}</H3>
                  ) : (
                    <H3 className="m-0 text-coinclustr-green">{`↑ ${roundNumber(
                      dayChange
                    )}%`}</H3>
                  )}
                </div>
              </Col>
            </Row>
          </BalanceContent>
        </>
      </div>
      {topupModalVisible && (
        <TopUpModal
          builtInWalletId={selectedWallet}
          closeHandler={() => setTopUpModalVisible(false)}
        />
      )}

      {/* <div className="mt-8 flex justify-start mb-4">
        <div className="flex mr-6 ">
          <CustomButton type="primary" size="medium">
            BUY CURRENCY
          </CustomButton>
        </div>
        <div className="flex mr-6 ">
          <CustomButton type="primary" className="outline" size="medium">
            SELL CURRENCY
          </CustomButton>
        </div>
      </div> */}
    </CustomCard>
  );
};

export default ExpandWalletCard;
