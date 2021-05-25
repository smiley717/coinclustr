import React, { useState, useEffect } from "react";
import { Skeleton, message, Empty, Divider } from "antd";
import moment from "moment";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Cookies from "js-cookie";

import { H3 } from "styled/Typography";
import CustomCard from "styled/CustomCard";

import NotificationCard from "components/NotificationCard";

import { GetAllNotifications } from "services/NotificationServices";

let stompClient;

const NotificationPage = () => {
  const [contentLoading, setContentLoading] = useState(true);
  const [notificationsData, setNotificationsData] = useState([]);
  const [pageDetails, setPageDetails] = useState({});
  const [todayNotificationData, setTodayNotificationData] = useState([]);
  const [earlierNotificationData, setEarlierNotificationData] = useState([]);
  

  // const connect = () => {
  //   const socket = new SockJS(
  //     "https://api.bss-cclustr.com/customer/notification"
  //   );
  //   stompClient = Stomp.over(socket);
  //   stompClient.connect(
  //     { Authorization: "Bearer " + Cookies.get("token") },
  //     function (frame) {
  //       console.log("Connected: " + frame);
  //       stompClient.subscribe("/user/event/notifications", function (greeting) {
  //         setNotificationsData(JSON.parse(greeting.body).content);
  //       });
  //     }
  //   );
  // };

  useEffect(() => {
    // connet as socket io
    // connect();
    GetAllNotifications()
      .then((res) => {
        setContentLoading(false);
        setPageDetails(res.data);
        setNotificationsData(res.data.content);
      })
      .catch((err) => {
        message.error(err.message);
        setContentLoading(false);
      });
  }, []);

  useEffect(() => {
    const todayNotifications = notificationsData.filter((element) => {
      return !element.deleted && moment(element.timestamp).isSame(moment(),  "day");
    });
    setTodayNotificationData(todayNotifications);
    const earlierNotification = notificationsData.filter((element) => {
      return !element.deleted && moment(element.timestamp).isBefore(moment(),  "day");
    });
    setEarlierNotificationData(earlierNotification);
  }, [notificationsData]);

  return (
    <div className="container mx-auto my-8">
      {contentLoading ? (
        <Skeleton active />
      ) : (
        <>
          <div className="flex items-center justify-start mb-10">
            <H3 className="m-0">{`Notifications (${pageDetails.unreadCount})`}</H3>
          </div>
          <div className="flex items-center justify-start mb-6">
            <H3>Today</H3>
          </div>
          {todayNotificationData.length > 0 ? (
            <CustomCard className="mb-10">
              <div className="flex flex-col w-full">
                {todayNotificationData.map((item, index) => {
                  const {
                    notificationId,
                    timestamp,
                    message,
                    eventType,
                    eventResourceId,
                  } = item;
                  return (
                    <>
                      <NotificationCard
                        key={notificationId}
                        notificationId={notificationId}
                        timestamp={timestamp}
                        message={message}
                        event={eventType}
                        eventResourceId={eventResourceId}
                      />
                      {index < todayNotificationData.length - 1 && <Divider />}
                    </>
                  );
                })}
              </div>
            </CustomCard>
          ) : (
            <CustomCard className="mb-10 flex justify-center items-center">
              <div className="flex flex-col w-full">
                <Empty />
              </div>
            </CustomCard>
          )}
          <div className="flex items-center justify-start mb-6">
            <H3>Earlier</H3>
          </div>
          {earlierNotificationData.length > 0 ? (
            <CustomCard className="mb-10">
              <div className="flex flex-col w-full">
                {earlierNotificationData.map((item, index) => {
                  const {
                    notificationId,
                    timestamp,
                    message,
                    eventType,
                    eventResourceId,
                  } = item;
                  return (
                    <>
                      <NotificationCard
                        key={notificationId}
                        notificationId={notificationId}
                        timestamp={timestamp}
                        message={message}
                        event={eventType}
                        eventResourceId={eventResourceId}
                      />
                      {index < earlierNotificationData.length - 1 && (
                        <Divider />
                      )}
                    </>
                  );
                })}
              </div>
            </CustomCard>
          ) : (
            <CustomCard className="mb-10 flex justify-center items-center">
              <div className="flex flex-col w-full">
                <Empty />
              </div>
            </CustomCard>
          )}
        </>
      )}
    </div>
  );
};

export default NotificationPage;
