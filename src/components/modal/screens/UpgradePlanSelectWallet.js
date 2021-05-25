import React, { useState } from "react";
import { message } from "antd";
import get from "lodash/get";
import { useRecoilState } from "recoil";

import BuiltInWalletSelect from "components/BuiltInWalletSelect";

import { LabelLarge } from "styled/Typography";
import { profileDataState } from "recoil/user";
import CustomButton from "styled/CustomButton";

import { GetBuiltInWallets } from "services/WalletServices";
import { ConvertCoinToCurrency } from "services/MarketServices";
import { UpgradeToPremiumPlan } from "services/BillingServices";

import { isEmpty } from "utils/common-utils";

const UpgradePlanSelectWallet = ({
  setModalStatus,
  setStep,
  setModalLoader,
  onChangePlan,
}) => {
  const [selectedWallet, setSelectedWallet] = useState({});
  const [errors, setErrors] = useState({ status: "normal", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileState] = useRecoilState(profileDataState);

  const handleChangeWallet = (item) => {
    setSelectedWallet(item);
  };

  const handleConfirmUpgradePlan = () => {
    if (!isEmpty(selectedWallet)) {
      setModalLoader({ visible: true, title: "Upgrading..." });
      setIsSubmitting(true);
      // ? Need to call API then check the balance again for sure
      GetBuiltInWallets()
        .then(async (res) => {
          const walletListData = get(res, "data", []);
          const selectedWalletData = walletListData.filter(
            (element) => element.walletId === selectedWallet.walletId
          )[0];
          if (!isEmpty(selectedWalletData)) {
            const request = {
              amount: get(selectedWalletData, "confirmedBalance", 0),
              coin: get(selectedWalletData, "type", "BITCOIN"),
              currency: "USD",
            };
            const convertCurrencyResponse = await ConvertCoinToCurrency(
              request
            );
            const usdPrice = get(
              convertCurrencyResponse,
              "data.convertedValue",
              0
            );
            if (usdPrice < -1) {
              setErrors({
                status: "error",
                message: "Minimal balance should be 7$",
              });
              setModalStatus("error");
              setModalLoader({ visible: false, title: "" });
            } else {
              const { subscriptionId } = profileState;
              const { walletId } = selectedWallet;
              UpgradeToPremiumPlan({ walletId: walletId })
                .then(() => {
                  onChangePlan("PREMIUM");
                  setStep(2);
                  setModalStatus("success");
                  setModalLoader({ visible: false, title: "" });
                })
                .catch((err) => {
                  message.error(err.message);
                  setModalLoader({ visible: false, title: "" });
                });
            }
          }
          setIsSubmitting(false);
        })
        .catch((err) => {
          message.error(err.message);
          setModalLoader({ visible: false, title: "" });
        });
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="w-10/12 flex items-center justify-center flex-col">
        <div className="flex justify-between w-full mb-4">
          <LabelLarge className="uppercase text-gray-200">
            To Premium
          </LabelLarge>
          <LabelLarge className="uppercase text-gray-200">7$/month</LabelLarge>
        </div>
        <BuiltInWalletSelect onChange={handleChangeWallet} status={errors} />
        <CustomButton
          type="primary"
          size="large"
          disabled={isEmpty(selectedWallet) || !isEmpty(errors.message)}
          onClick={handleConfirmUpgradePlan}
          loading={isSubmitting}
          className="mt-8"
        >
          UPGRADE
        </CustomButton>
      </div>
    </div>
  );
};

export default UpgradePlanSelectWallet;
