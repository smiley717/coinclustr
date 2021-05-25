import React, { useEffect, useState } from "react";
import { Row, Empty, Divider, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { sumBy } from "lodash";
import get from "lodash/get";
import { css } from "glamor";

import CustomCard from "../styled/CustomCard";
import { H3, Label } from "../styled/Typography";

import { ConvertCoinToCurrency } from "services/MarketServices";
import { isEmpty, numberWithCommas, stringToPascal } from "utils/common-utils";

import { ReactComponent as BuiltInIcon } from "../img/icons/built-in.svg";
import { ReactComponent as BitcoinFlatIcon } from "../img/icons/bitcoin-orange.svg";

const PorfolioCardStyles = css({
  width: "360px",
});

const PorfolioCard = ({ data, isFetching }) => {
  const [listData, setListData] = useState(data);
  const [isCalculating, setIsCalculating] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    async function calculatingData() {
      if (!isEmpty(data)) {
        let newData = [];
        for (var i = 0; i < data.length; i++) {
          let item = { ...data[i] };
          const request = {
            amount: item.confirmedBalance,
            coin: "BITCOIN",
            currency: "USD",
          };
          const usdPrice = await ConvertCoinToCurrency(request);
          item = { ...item, usdPrice: get(usdPrice, "data.convertedValue", 0) };
          newData.push(item);
        }
        setListData(newData);
        // ? For the performance, don't call setState into the loop in above
        const total = sumBy(newData, function (o) {
          return o.usdPrice;
        });
        setWalletBalance(total || 0);
        setIsCalculating(false);
      } else {
        setIsCalculating(false);
      }
    }

    calculatingData();
  }, [data]);

  return (
    <CustomCard display="block" {...PorfolioCardStyles}>
      <Row className="block mb-2">
        <Label className="mb-2">Your Porfolio</Label>
      </Row>
      <Row className="flex justify-start items-baseline">
        <H3 className="text-coinclustr-gray-80">
          $ {numberWithCommas(walletBalance)}{" "}
        </H3>
        <Label className="ml-2 text-coinclustr-gray-80">Current balance</Label>
      </Row>
      <div className="w-full">
        <Divider style={{ margin: "6px 0px" }} />
        {isFetching || isCalculating ? (
          <Skeleton />
        ) : listData.length === 0 ? (
          <Empty />
        ) : (
          listData.map((item) => {
            const { walletId, type, confirmedBalance, usdPrice } = item;
            return (
              <div
                key={walletId}
                className="flex w-full justify-between items-center"
              >
                <div className="flex justify-between">
                  <BitcoinFlatIcon />
                  <Label className="pl-8">{stringToPascal(type)}</Label>
                </div>
                <BuiltInIcon />
                <div className="flex flex-col justify-end">
                  <Label textalign="right" className="text-right">
                    {`$ ${numberWithCommas(usdPrice)}`}
                  </Label>
                  <Label textalign="right" className="text-right">
                    {`${confirmedBalance} BTC`}
                  </Label>
                </div>
              </div>
            );
          })
        )}
        <Divider style={{ margin: "6px 0px" }} />
        <span className="flex py-2 cursor-pointer text-center w-full justify-center items-center">
          <Link to="/wallets">
            <Label className="text-bold flex items-center">
              <span>View more</span> <RightOutlined className="ml-2" />
            </Label>
          </Link>
        </span>
      </div>
    </CustomCard>
  );
};

export default PorfolioCard;
