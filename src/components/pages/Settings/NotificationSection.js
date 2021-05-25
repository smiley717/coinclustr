import React, { useState, useEffect } from "react";
import { Divider, message, Switch } from "antd";
import { useRecoilState } from "recoil";
import get from "lodash/get";

import { LabelLarge, H3 } from "styled/Typography";
import CustomCard from "styled/CustomCard";

import { UpdateNotificationControl } from "services/NotificationServices";
import { isEmpty } from "utils/common-utils";

import { profileDataState } from "recoil/user";

const NotificationSection = () => {
  const [profileState] = useRecoilState(profileDataState);
  const [successPaymentChecked, setSuccessPaymentChecked] = useState(false);
  const [newTransactionChecked, setNewTransactionChecked] = useState(false);
  const [quotaRemindersChecked, setQuotaRemindersChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleRequest = () => {
    let request = [];
    successPaymentChecked && request.push("SUCCESSFUL_PAYMENT");
    newTransactionChecked && request.push("NEW_TRANSACTION");
    quotaRemindersChecked && request.push("QUOTA_REMINDERS");
    UpdateNotificationControl({ notificationControl: request })
      .then(() => {
        message.success("Notifications settings change success");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const onChangeSuccessPayment = (checked) => {
    setSuccessPaymentChecked(checked);
  };

  const onChangeNewTransaction = (checked) => {
    setNewTransactionChecked(checked);
  };

  const onChangeQuotaReminders = (checked) => {
    setQuotaRemindersChecked(checked);
  };

  useEffect(() => {
    if (!loading) {
      handleRequest();
    }
  }, [successPaymentChecked, newTransactionChecked, quotaRemindersChecked]);

  useEffect(() => {
    const notificationControlData = get(
      profileState,
      "notificationControl",
      []
    );
    const notificationControl = isEmpty(notificationControlData)
      ? []
      : notificationControlData;
    if (notificationControl.indexOf("SUCCESSFUL_PAYMENT") > -1) {
      setSuccessPaymentChecked(true);
    }
    if (notificationControl.indexOf("NEW_TRANSACTION") > -1) {
      setNewTransactionChecked(true);
    }
    if (notificationControl.indexOf("QUOTA_REMINDERS") > -1) {
      setQuotaRemindersChecked(true);
    }
    setLoading(false);
  }, []);

  return (
    <section className="w-full mb-10">
      <div className="flex mt-2 w-full">
        <H3>Notification</H3>
      </div>
      <div className="mb-6 w-full">
        <CustomCard display="block">
          <div className="flex justify-between items-center w-full">
            <LabelLarge className="font-normal">Successful Payment</LabelLarge>
            <Switch
              checked={successPaymentChecked}
              onChange={onChangeSuccessPayment}
            />
          </div>
          <Divider className="p-0 my-6" />
          <div className="flex justify-between items-center w-full">
            <LabelLarge className="font-normal">New Transaction</LabelLarge>
            <Switch
              checked={newTransactionChecked}
              onChange={onChangeNewTransaction}
            />
          </div>
          <Divider className="p-0 my-6" />
          <div className="flex justify-between items-center w-full">
            <LabelLarge className="font-normal">Quota Reminders</LabelLarge>
            <Switch
              checked={quotaRemindersChecked}
              onChange={onChangeQuotaReminders}
            />
          </div>
        </CustomCard>
      </div>
    </section>
  );
};

export default NotificationSection;
