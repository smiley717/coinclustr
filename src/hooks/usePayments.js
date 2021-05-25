import { useState, useEffect, useCallback } from "react";
import { GetAllPayments } from "services/PaymentServices";
import { RECORD_PER_PAGE } from "utils/Constant";
import { useRecoilState } from "recoil";
import { profileDataState, settingsDateState } from "../recoil/user";

export const usePayments = () => {
  const [tableLoading, setTableLoading] = useState(true);
  const [paymentList, setPaymentList] = useState([]);
  const [sortablePagination, setSortablePagination] = useState(null);
  const [profileState] = useRecoilState(profileDataState);

  const fetchPage = useCallback((offset, pageNo, end, start, filterBySearch) => {
    setTableLoading(true);
    var filterBySearch = filterBySearch || ""
    const params = {
      offset,
      pageNo,
      pageSize: RECORD_PER_PAGE,
      end,
      start,
      filterBySearch
    };
    console.log(params)
    GetAllPayments(params).then(({ data }) => {
      const { content, ...theRest } = data;
      const { email } = profileState;
      setSortablePagination(theRest);
      setPaymentList(content.map(payment => ({
        recipient: getRecipient(payment.toPeer, email),
        mine: isReceived(email, payment.toPeer),
        created: payment.createdAt,
        amount: getAmountAsString(payment.toPeer, email, payment.amount),
        currency: payment.type,
        id: payment.id,
        key: payment.toAddress,
      })))
      setTableLoading(false);
    });
  }, []);

  const getAmountAsString = (peer, user, amount) => {
    var peerEmail = peer?.email || '';
    if (isReceived(peerEmail,user)){
      return "+ "+ amount;
    }
    return "- "+ amount;
  }
  const getRecipient = (peer, user) => {
    var peerEmail = peer?.email || '';
    var peerFullname = peer?.fullName || peerEmail;
    if (isReceived(peerEmail, user)) {
      return 'From: \n'+peerFullname;
    }
    return peerFullname;

  }
  const isReceived = (peerEmail, user) => {
    return peerEmail === user
  }
  useEffect(() => {
    fetchPage(0, 0, null, null);
  }, [fetchPage]);

  return {
    fetchPage,
    paymentList,
    tableLoading,
    sortablePagination
  }
}