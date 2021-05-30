import React, { useState, useEffect, useCallback } from "react";
import { Divider } from "antd";
import { useRecoilState } from "recoil";
import get from "lodash/get";
import moment from "moment";

import { LabelLarge, BodyText, H3, Subtitle } from "styled/Typography";
import CustomCard from "styled/CustomCard";
import CustomButton from "styled/CustomButton";
import CustomTable from "components/custom/CustomTable";

import CustomPagination from "components/custom/CustomPagination";
import {
  ChangePasswordModal,
  TwoFactorAuthenticationModal,
} from "components/modal";
import { DATETIME_FORMAT, RECORD_PER_PAGE } from "utils/Constant";

import { GetCustomerLoginHistory } from "services/CustomerService";
import { profileDataState } from "recoil/user";

const columns = [
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "User Agent",
    dataIndex: "userAgent",
    key: "userAgent",
  },
  {
    title: "IP Address",
    dataIndex: "ipAddress",
    key: "ipAddress",
  },
  {
    title: "Date and time",
    dataIndex: "timestamp",
    key: "timestamp",
    render: (timestamp) => moment(timestamp).format(DATETIME_FORMAT),
  },
];

const SettingSecurityPage = () => {
  const [loginHistoryData, setLoginHistoryData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [profileState] = useRecoilState(profileDataState);
  const [currentPage, setCurrentPage] = useState(0);
  const [
    isModalChangePasswordVisible,
    setIsModalChangePasswordVisible,
  ] = useState(false);
  const [
    isModalTwoFactorAuthentication,
    setIsModalTwoFactorAuthentication,
  ] = useState(false);

  const fetchPage = useCallback(
    (offset, pageNumber) => {
      setIsFetching(true);
      const userId = get(profileState, "userId", "");
      const request_params = {
        offset: offset,
        pageNo: pageNumber,
        pageSize: RECORD_PER_PAGE,
      };
      GetCustomerLoginHistory(userId, request_params)
        .then((res) => {
          setIsFetching(false);
          setLoginHistoryData(get(res, "data.content", []));
          setTotalRecords(get(res, "data.totalElements", 0));
        })
        .catch(() => {
          setIsFetching(false);
        });
    },
    [profileState]
  );

  const handleGoToPreviousPage = () => {
    const thePreviousPage = currentPage - 1;
    fetchPage(currentPage * RECORD_PER_PAGE, thePreviousPage);
    setCurrentPage(thePreviousPage);
  };
  const handleGoToNextPage = () => {
    const theNextPage = currentPage + 1;
    fetchPage(currentPage * RECORD_PER_PAGE, theNextPage);
    setCurrentPage(theNextPage);
  };

  useEffect(() => {
    fetchPage(0, 0);
  }, [fetchPage]);

  return (
    <div className="w-full">
      <ChangePasswordModal
        visible={isModalChangePasswordVisible}
        setVisible={setIsModalChangePasswordVisible}
      />
      <TwoFactorAuthenticationModal
        visible={isModalTwoFactorAuthentication}
        setVisible={setIsModalTwoFactorAuthentication}
      />
      <div className="w-full">
        <H3>Profile</H3>
      </div>
      <div className="w-full">
        <CustomCard display="block">
          <div className="flex items-center justify-between">
            <div className="w-6/12">
              <div className="flex my-2 flex-col md:flex-row">
                <LabelLarge className="mr-16">Password</LabelLarge>
                <BodyText>******************</BodyText>
              </div>
            </div>
            <div className="w-6/12">
              <div className="block flex items-center justify-end">
                <CustomButton
                  size="small"
                  type="default"
                  className="outline"
                  onClick={() => setIsModalChangePasswordVisible(true)}
                >
                  CHANGE
                </CustomButton>
              </div>
            </div>
          </div>
          <Divider className="my-2" />
          <div className="flex items-center justify-between">
            <div className="w-6/12">
              <div className="flex my-2 flex-col md:flex-row">
                <LabelLarge className="mr-16">
                  Two-factor authentication
                </LabelLarge>
                <BodyText>+380 9 ****** 04</BodyText>
              </div>
            </div>
            <div className="w-6/12">
              <div className="block flex items-center justify-end">
                <CustomButton
                  size="small"
                  type="default"
                  className="outline"
                  onClick={() => setIsModalTwoFactorAuthentication(true)}
                >
                  CONFIGURE
                </CustomButton>
              </div>
            </div>
          </div>
        </CustomCard>
      </div>
      <div className="mt-8 mb-4 w-full flex flex-col">
        <H3>Account History</H3>
        <Subtitle>Recent activity on your account</Subtitle>
      </div>
      <div className="w-full">
        <div className="w-full">
          <CustomTable
            dataSource={loginHistoryData}
            columns={columns}
            pagination={false}
            loading={isFetching}
          />
        </div>
        <div className="flex justify-center items-center">
          <CustomPagination
            totalRecords={totalRecords}
            currentPage={currentPage}
            numberPerPage={RECORD_PER_PAGE}
            handleGoToPreviousPage={handleGoToPreviousPage}
            handleGoToNextPage={handleGoToNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingSecurityPage;
