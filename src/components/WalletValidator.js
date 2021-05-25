import React, { useEffect, useState } from "react";
import CustomInput from "styled/CustomInput";
import { CheckCustomerEmail } from "services/CustomerService";
import { GetAddressVerified } from "services/PaymentServices";
import { Validation } from "components/Validation";
import { isEmail, isEmpty } from "utils/common-utils";
import { Verified } from "./Verified";
import { errorStatus } from "utils/error-status";
import { ReactComponent as ErrorIcon } from "img/icons/error.svg";
import { Text } from 'styled/Typography';

const WalletValidator = ({ paymentTarget, reverse, onChange, preSelectedWallet, onInternalServerError }) => {
  const [wallet, setWallet] = useState(preSelectedWallet);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(null);


  const validateAccount = () => CheckCustomerEmail(wallet, reverse);
  const validateAddress = () => GetAddressVerified({
    address: wallet,
    test: false,
    type: 'BITCOIN'
  });
  const validator = () => {
    setIsValidating(true);
    setError(null);
    let validate;
    let errorMsg = null;
    if (paymentTarget === "coinclustr-account") {
      errorMsg = 'Email not a valid Coinclustr account. Try again.';
      if (isEmail(wallet)) {
        validate = validateAccount;
      }
    } else {
      errorMsg = 'Not a valid address. Try again.';
      if (!isEmpty(wallet)) {
        validate = validateAddress;
      }
    }
    if (!validate) {
      setError(errorMsg);
      setIsValidating(false);
      setIsValid(false);
      return;
    }
    validate().then(() => {
      setIsValidating(false);
      onChange(wallet);
      setIsValid(true);
      setError(null);
    }).catch((err) => {
      errorStatus(err, () => {
        setError(errorMsg)
      }, onInternalServerError);
    }).finally(() => {
      setIsValidating(false);
    });
  }

  const onWalletChange = (evt) => {
    setWallet(evt.target.value);
  };

  useEffect(() => {
    if (preSelectedWallet) {
      validator();
    }
  }, [preSelectedWallet])
  return (<div>
    <CustomInput className={error ? 'border-red-500' : ''} onBlur={validator} value={wallet} onChange={onWalletChange} size="large"></CustomInput>
    {isValidating && <Validation />}
    {(!isValidating && isValid) && <Verified />}
    {error && (
      <span className="flex w-full items-start  my-2">
        <ErrorIcon />
        <Text className="text-coinclustr-red ml-2">{error}</Text>
      </span>
    )}
  </div>);
};

export default WalletValidator;
