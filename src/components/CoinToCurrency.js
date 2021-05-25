import React, { useEffect, useState } from "react";
import { CustomInputNumber } from "styled/CustomInput";
import SwapOutlined from 'img/icons/swap.svg';
import { css } from "glamor";
import { ConvertCoinToCurrency } from "services/MarketServices";
import { BodyText } from "styled/Typography";

const TooglerStyles = css({
  position: 'absolute',
  top: "-30px",
  right: 0,
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  gap: '5px',
  alignItems: 'center',
  color: '#8A9197',
  ':hover': {
    color: '#8A9197'
  }
});
const WrapperStyles = css({
  position: 'relative',
});


const ConversionStyles = css({
  position: 'absolute',
});


export const CoinToCurrency = ({ amount, onChange }) => {
  const [isCurrency, setIsCurrency] = useState(false);

  const [conversion, setConversion] = useState(0);
  const [amnt, setAmnt] = useState(amount);

  const onToggle = () => {
    setIsCurrency(!isCurrency);
  }

  const convertCoinToCurrency = (desabledWhileFetching = false) => {
    ConvertCoinToCurrency({
      amount: amnt,
      coin: "BITCOIN",
      currency: "USD",
      ...(isCurrency ? { reverse: true } : {})
    }).then(({ data }) => {
      setConversion(data.convertedValue || 0);
    })
      .catch(() => {
        setConversion("unknown");
      });
  }


  const onChangeInput = value => {
    if (!isNaN(value) && Number(value) >= 0) {
      onChange(value);
      setAmnt(value);
      convertCoinToCurrency();
      return true;
    }
    return false;
  }

  useEffect(() => {
    convertCoinToCurrency(true);
  }, [amnt, isCurrency]);
  return (
    <div {...WrapperStyles}>
      <a {...TooglerStyles} onClick={onToggle}>
        <img src={SwapOutlined} alt="swap" />
        {isCurrency ? 'BTC' : 'USD'}
      </a>
      <CustomInputNumber
        onChange={onChangeInput}
        value={amnt}
        size="large"
        type="number"
      />
      <div className="text-right w-full" {...ConversionStyles}>
        <BodyText >
          {`${amnt} ${isCurrency ? 'USD' : 'BTC'} = ${conversion} ${isCurrency ? 'BTC' : 'USD'}`}
        </BodyText>
      </div>
    </div>);
}