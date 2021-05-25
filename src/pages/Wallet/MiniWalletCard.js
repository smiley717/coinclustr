import React, { useEffect, useState } from "react";
import { css } from "glamor";
import get from "lodash/get";
import { Skeleton } from "antd";

import CustomCard from "../../styled/CustomCard";
import { Label } from "../../styled/Typography";
import { ConvertCoinToCurrency } from "../../services/MarketServices";
import { isEmpty, stringToPascal, numberWithCommas } from "utils/common-utils";

import BuiltInIcon from "../../img/icons/built-in.svg";
import BitcoinFlatIcon from "../../img/icons/bitcoin-orange.svg";

const inActiveCard = css({
  padding: "16px",
  display: "flex",
  position: "relative",
});

const MiniWalletCard = ({ data, isActive, isBuiltIn, handleClick }) => {
  const [usdPrice, setUsdPrice] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const { type, confirmedBalance } = data;

  useEffect(() => {
    if (!isEmpty(data)) {
      ConvertCoinToCurrency({
        amount: confirmedBalance,
        coin: "BITCOIN",
        currency: "USD",
      })
        .then((res) => {
          setUsdPrice(get(res, "data.convertedValue", 0));
          setIsFetching(false);
        })
        .catch(() => {
          setIsFetching(false);
          setUsdPrice("unknown");
        });
    }
  }, [confirmedBalance, data]);

  if (isActive) {
    return (
      <CustomCard
        alignitems="flex-start"
        className="mb-2 cursor-pointer"
        style={{ position: "relative" }}
        onClick={handleClick}
      >
        {isFetching ? (
          <Skeleton />
        ) : (
          <div className="w-full flex justify-between">
            <div className="flex items-start">
              <img
                src={BitcoinFlatIcon}
                width="35px"
                height="35px"
                alt="Bitcoin icon"
              />
              <div className="pl-4">
                <Label className="flex justify-start">{stringToPascal(type)}</Label>
                <Label className="flex justify-start">
                  {confirmedBalance} BTC
                </Label>
                <Label className="flex justify-start">{`$${numberWithCommas(usdPrice)} USD`}</Label>
              </div>
            </div>
            {isBuiltIn ? <img src={BuiltInIcon} alt="Built-in wallet" /> : null}
          </div>
        )}
      </CustomCard>
    );
  }
  return (
    <div
      className="mb-2 hover:bg-white hover:border hover:border-gray-800 cursor-pointer"
      {...inActiveCard}
      onClick={handleClick}
    >
      {isFetching ? (
        <Skeleton />
      ) : (
        <div className="w-full flex justify-between">
          <div className="flex items-start">
            <img
              src={BitcoinFlatIcon}
              width="35px"
              height="35px"
              alt="Bitcoin icon"
            />
            <div className="pl-4">
              <Label className="flex justify-start">{type}</Label>
              <Label className="flex justify-start">{usdPrice} USD</Label>
              <Label className="flex justify-start">
                {confirmedBalance} BTC
              </Label>
            </div>
          </div>
          {isBuiltIn ? <img src={BuiltInIcon} alt="Built-in wallet" /> : null}
        </div>
      )}
    </div>
  );
};

export default MiniWalletCard;
