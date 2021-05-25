import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const CustomPaginationStyled = styled.div`
  min-width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.primaryFont};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0px;
  margin: 16px 0px;
  .arrow {
    font-size: 18px;
    cursor: pointer;
  }
  .arrow.inactive {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const CustomPagination = ({
  totalRecords,
  currentPage,
  numberPerPage,
  handleGoToPreviousPage,
  handleGoToNextPage,
}) => {
  const [firstCurrentIndex, setFirstCurrentIndex] = useState(1);
  const [lastCurrentIndex, setLastCurrentIndex] = useState(numberPerPage);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const indexPage = currentPage + 1;
    const maxPage = Math.ceil(totalRecords / numberPerPage);
    if (indexPage === 1 || indexPage < 1) {
      setIsFirstPage(true);
      setIsLastPage(false);
    } else if (indexPage === maxPage || indexPage > maxPage) {
      setIsFirstPage(false);
      setIsLastPage(true);
    } else {
      setIsFirstPage(false);
      setIsLastPage(false);
    }
    const firstIndex = numberPerPage * (indexPage - 1);
    setFirstCurrentIndex(firstIndex === 0 ? 1 : firstIndex);
    const lastIndex = firstIndex + numberPerPage;
    setLastCurrentIndex(lastIndex > totalRecords ? totalRecords : lastIndex);
  }, [totalRecords, currentPage, numberPerPage]);

  const goToPreviousPage = () => {
    if (!isFirstPage) {
      handleGoToPreviousPage();
    }
  };

  const goToNextPage = () => {
    if (!isLastPage) {
      handleGoToNextPage();
    }
  };

  return (
    <CustomPaginationStyled>
      <LeftOutlined
        className={`arrow left-arrow ${isFirstPage ? "inactive" : ""}`}
        onClick={goToPreviousPage}
      />
      <span>{`${firstCurrentIndex} - ${lastCurrentIndex} of ${totalRecords}`}</span>
      <RightOutlined
        className={`arrow left-arrow ${isLastPage ? "inactive" : ""}`}
        onClick={goToNextPage}
      />
    </CustomPaginationStyled>
  );
};

export default CustomPagination;
