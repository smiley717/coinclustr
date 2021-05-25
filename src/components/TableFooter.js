import React, { useState } from "react";

import CustomPagination from "../styled/CustomPagination";
import { RECORD_PER_PAGE } from "../utils/Constant";

const TableFooter = ({ data = 0, onHandleChangePage = null }) => {
  const [current, setCurrent] = useState(0);
  const total = data.length || 0;

  const onChange = (page) => {
    setCurrent(page);
    if (onHandleChangePage) onHandleChangePage(page);
  };

  return (
    <div className="flex justify-between items-center">
      <CustomPagination
        hideNavigator
        current={current}
        onChange={onChange}
        total={total}
        pageSize={RECORD_PER_PAGE}
      />
      {parseInt(total) > 0 && (
        <span className="flex justify-end items-center">{`${total} records found`}</span>
      )}
    </div>
  );
};

export default TableFooter;
