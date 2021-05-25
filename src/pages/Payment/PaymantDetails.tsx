import React, { useEffect, useState } from "react";
import { List } from "antd";
import { H3, LabelLarge, Label, BodyText } from "styled/Typography";
import { ReactComponent as BitCoinOrange } from 'img/icons/bitcoin-orange.svg';
import { CustomList } from "styled/CustomList";
import BackToPaymants from "./BackToPaymants";
import usePaymantDetails from "./usePaymantDetails";
import { TItem, TInfo } from './PaymantDetails.type';


export default function PaymantDetails() {
  const data = usePaymantDetails();
  if (!data) return null;
  return (
    <div className="container my-8 mx-auto">
      <BackToPaymants />
      <H3 className="mb-0 mt-8">Payment Details</H3>
      <CustomList
        size="large"
        className="classic"
        dataSource={[data.paymentInfo]}
        renderItem={({ amount, recipient }: TInfo) => (
          <List.Item className='no-border'>
            <List.Item.Meta
              title={<BitCoinOrange />}
              description={<LabelLarge>You paid {amount} BTC to {recipient}</LabelLarge>}
            />
          </List.Item>
        )}
      />
      <CustomList
        size="large"
        bordered
        dataSource={data.paymentDetails}
        renderItem={({ title, value, itemClass = '' }: TItem) => (
          <List.Item className={itemClass}>
            <List.Item.Meta
              title={<Label>{title}</Label>}
              description={value.map(text =>
                <div key={`${title}_${text}`}>
                  <BodyText >{text}</BodyText>
                </div>
              )}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
