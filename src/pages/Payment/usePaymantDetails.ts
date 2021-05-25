import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { paymentId as pid } from '../../recoil/payments';
import { GetPaymentDetails } from "services/PaymentServices";
import { TData } from './PaymantDetails.type';

export default function usePaymantDetails() {
  const [paymentId] = useRecoilState(pid);
  const [data, setData] = useState<TData | null>(null);
  useEffect(() => {
    if (paymentId) {
      GetPaymentDetails(paymentId).then(({ data }) => {
        setData({
          paymentDetails: [{
            title: 'ID',
            value: [data.id]
          }, {
            title: 'Wallet',
            value: [data.senderWalletId]
          }, {
            title: 'Recipient info',
            value: [data.toPeer.fullName, data.toPeer.email, data.toAddress],
            itemClass: 'no-border',
          }, {
            title: 'Notes',
            value: [],
          }, {
            title: 'Amount',
            value: [data.amount],
            itemClass: 'no-border',
          }, {
            title: 'Fee',
            value: [data.fee || 0],
            itemClass: 'no-border no-padding',
          }, {
            title: 'Total',
            value: [data.amount],
            itemClass: 'no-border',
          }],
          paymentInfo: {
            amount: data.amount,
            recipient: data.toPeer.fullName,
          }
        });
      })
    }
  }, [paymentId]);
  return data;
}
