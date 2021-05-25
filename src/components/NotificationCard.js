import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { Label, BodyText } from "styled/Typography";
import CustomButton from "styled/CustomButton";

import { DATETIME_FORMAT, NOTIFICATIONS_EVENT_AND_LABEL } from "utils/Constant";

import { ReactComponent as CloseIcon } from "img/icons/close-icon.svg";
import { ViewNotification } from "services/NotificationServices";
import { useRecoilState } from "recoil";
import { notificationState } from "recoil/user";


const NotificationCard = ({ notificationId, timestamp, message, event, eventResourceId }) => {
  const [notification, setNotification] = useRecoilState(notificationState);
  const generateButtonLink = (event, eventResourceId) => {
    if (event.startsWith("INVOICE_")) {
      return `/invoices/${eventResourceId}`;
    }
    if (event.startsWith("SUBSCRIPTION_")) {
      return "/settings/profile";
    }
    return "/";
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center flex-col">
        <Label className="self-start">
          {NOTIFICATIONS_EVENT_AND_LABEL[event].event_label}
        </Label>
        <BodyText className="self-start">{message}</BodyText>
        <Label className="text-coinclustr-gray-20 self-start">
          {moment(timestamp).format(DATETIME_FORMAT)}
        </Label>
      </div>
      <div className="flex items-center">
        <Link onClick={() => {ViewNotification(notificationId); setNotification({})}} to={generateButtonLink(event, eventResourceId)}>
          <CustomButton
            className="outline text-uppercase"
            type="default"
            size="large"
          >
            {NOTIFICATIONS_EVENT_AND_LABEL[event].button_label}
          </CustomButton>
        </Link>
        <CloseIcon className="ml-5" role="button" />
      </div>
    </div>
  );
};

export default NotificationCard;
