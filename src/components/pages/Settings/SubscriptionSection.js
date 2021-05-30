import React, { useEffect, useState } from "react";
import { Radio, Divider, Empty, Skeleton, message } from "antd";
import { css } from "glamor";
import queryString from "query-string";
import { useRecoilState } from "recoil";
import get from "lodash/get";
import moment from "moment";

import { H4, BodyText, LabelLarge, Label } from "styled/Typography";
import CustomCard from "styled/CustomCard";
import CustomButton from "styled/CustomButton";
import CircleColorIcon from "components/CircleColorIcon";
import { profileDataState } from "recoil/user";

import { GetSubscriptionDetail } from "services/BillingServices";
import { GetSingleWalletDetail } from "services/WalletServices";
import { ConvertCoinToCurrency } from "services/MarketServices";

import { isEmpty } from "utils/common-utils";
import { DATETIME_FORMAT } from "utils/Constant";

import { ReactComponent as CheckedIcon } from "img/icons/checked.svg";
import { ReactComponent as BuiltInIcon } from "img/icons/built-in.svg";
import { ReactComponent as BitcoinYellowIcon } from "img/icons/bitcoin-yellow.svg";

const SubscriptionContainerStyles = css({
  "@media (max-width: 768px)": {
    width: "100%",
  },
  width: "576px",
});

const SubscriptionSection = ({
  selectedPlan,
  onChangePlan,
  setAddNewPaymentMethodVisible,
}) => {
  const [profileState] = useRecoilState(profileDataState);
  const [
    premiumSubscriptionDetailLoading,
    setPremiumSubscriptionDetailLoading,
  ] = useState(true);
  const [premiumLoadingError, setPremiumLoadingError] = useState(false);
  const [premiumSubscriptionDetail, setPremiumSubscriptionDetail] = useState(
    null
  );
  const [currentPlan, setCurrentPlan] = useState(selectedPlan);
  const parsed = queryString.parse(window.location.search);

  const generatePremiumDetail = () => {
    if (premiumSubscriptionDetailLoading) {
      return <Skeleton active />;
    }

    if (premiumLoadingError) {
      return (
        <div className="w-full py-8">
          <Empty />
        </div>
      );
    }

    if (
      !premiumSubscriptionDetailLoading &&
      !isEmpty(premiumSubscriptionDetail)
    ) {
      const { subscriptionEndDate, walletDetail } = premiumSubscriptionDetail;
      const { category, price, type, confirmedBalance } = walletDetail;
      const { convertedValue } = price;
      return (
        <div className="w-full flex flex-col justify-between">
          <Divider />
          <div className="w-full flex flex-col justify-between">
            <div className="w-full flex justify-between items-center">
              <LabelLarge>Payment method</LabelLarge>
              <CustomButton
                size="small"
                type="default"
                className="outline text-uppercase"
                onClick={() => {
                  setAddNewPaymentMethodVisible(true);
                }}
              >
                Edit
              </CustomButton>
            </div>
            <div className="w-full flex justify-between">
              <div className="flex items-center">
                <CircleColorIcon
                  className="bg-coinclustr-orange mr-6"
                  width="25px"
                  height="25px"
                  iconWidth="13px"
                  iconHeight="13px"
                >
                  <BitcoinYellowIcon />
                </CircleColorIcon>
                <div className="flex flex-col">
                  <Label className="text-coinclustr-gray-40 capitalize">
                    {type}
                  </Label>
                  <Label className="text-coinclustr-gray-60">{`$${convertedValue}`}</Label>
                  <Label className="text-coinclustr-gray-40">
                    {`${confirmedBalance}`} BTC
                  </Label>
                </div>
                {category === "BUILTIN" && <BuiltInIcon className="ml-8" />}
              </div>
              <div className="flex items-end">
                <BodyText>{`Next payment on ${moment(
                  subscriptionEndDate
                ).format(DATETIME_FORMAT)}`}</BodyText>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    const { subscriptionId } = profileState;
    GetSubscriptionDetail()
      .then((res) => {
        setPremiumSubscriptionDetailLoading(true);
        let subscriptionDetail = res.data;
        const { builtInWalletId } = subscriptionDetail;
        setCurrentPlan(subscriptionDetail.subscriptionType);
        GetSingleWalletDetail(builtInWalletId)
          .then(async (detailResponse) => {
            subscriptionDetail.walletDetail = detailResponse.data;
            const request = {
              amount: get(detailResponse, "data.confirmedBalance", 0),
              coin: "BITCOIN",
              currency: "USD",
            };
            const usdPrice = await ConvertCoinToCurrency(request);
            subscriptionDetail.walletDetail.price = usdPrice.data;
            setPremiumSubscriptionDetail(subscriptionDetail);
            setPremiumSubscriptionDetailLoading(false);
          })
          .catch((detailError) => {
            message.error(detailError.message);
            setPremiumLoadingError(true);
          });
      })
      .catch(() => {
        setPremiumSubscriptionDetailLoading(false);
        setPremiumLoadingError(true);
      });
  }, []);

  return (
    <div className="flex flex-col" {...SubscriptionContainerStyles}>
      {parsed.premium === "success" && currentPlan === "PREMIUM" ? (
        <div className="flex w-full justify-start items-center bg-green-200 border border-green-400 rounded-md px-2 py-2 mb-4">
          <CheckedIcon className="mr-4" />
          <BodyText className="text-coinclustr-green">
            Subscription plan was successfully changed
          </BodyText>
        </div>
      ) : null}
      <div className="w-full flex flex-col">
        <Radio.Group
          onChange={onChangePlan}
          value={currentPlan}
          className="w-full"
        >
          <CustomCard className="mb-4 w-full">
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center">
                <Radio
                  onChange={onChangePlan}
                  value="BASIC"
                  className="flex items-center mr-3"
                  style={{ marginTop: "-5px" }}
                ></Radio>
                <LabelLarge className="m-0">Basic plan</LabelLarge>
              </span>
              <H4 className="m-0">Free</H4>
              <BodyText className="hidden sm:hidden md:block">
                {currentPlan === "BASIC" ? "Activated" : "Downgrade"}
              </BodyText>
            </div>
          </CustomCard>
          <CustomCard
            display="flex"
            justifycontent="space-between"
            alignitems="center"
            prefix="none"
            className="mb-4"
          >
            <div className="w-full flex flex-col">
              <div className="w-full flex justify-between">
                <span className="flex items-center">
                  <Radio
                    value="PREMIUM"
                    className="flex items-center mr-3"
                    style={{ marginTop: "-5px" }}
                  ></Radio>
                  <LabelLarge className="m-0">Premium plan</LabelLarge>
                </span>
                <H4 className="m-0">7$/month</H4>
                <BodyText className="hidden sm:hidden md:block">
                  {currentPlan === "PREMIUM" ? "Activated" : "Upgrade"}
                </BodyText>
              </div>
              {currentPlan === "PREMIUM" ? generatePremiumDetail() : null}
            </div>
          </CustomCard>
        </Radio.Group>
      </div>
    </div>
  );
};

export default SubscriptionSection;
