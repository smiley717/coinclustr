import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { GetTopups } from "services/BillingServices";
import { RECORD_PER_PAGE } from "utils/Constant";

export const useTopUps = () => {
  const [tableLoading, setTableLoading] = useState(true);
  const [list, setList] = useState([]);
  const [type, setType] = useState('');
  const [sortablePagination, setSortablePagination] = useState(null);
  const { walletid } = useParams();
  const fetchPage = useCallback((pageNo) => {
    setTableLoading(true);
    const params = {
      pageNo,
      pageSize: RECORD_PER_PAGE,
      walletId: walletid
    };
    GetTopups(params).then(({ data }) => {
      const { content, ...theRest } = data;
      setSortablePagination(theRest);
      const [found] = content;
      const transactions = content.reduce((acc, { paymentInfo: { transactions } }) => [...acc, ...(transactions || [])], [])
      setList(transactions);
      setType(found ? `(${found.type})` : '');
      setTableLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchPage(0);
  }, [fetchPage]);

  return {
    fetchPage,
    list,
    tableLoading,
    sortablePagination,
    type
  }
}