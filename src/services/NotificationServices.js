import { requestWithToken } from "./HttpServices";

export const GetAllNotifications = () =>
  requestWithToken(`/customer/notifications`, {
    method: "GET",
  });

export const ViewNotification = (id) =>
  requestWithToken(`/customer/notification/${id}/seen`, {
    method: "POST",
  });

export const GetAllNotificationsInfo = () =>
  requestWithToken(`/customer/notifications/info`, {
    method: "GET",
  });

export const UpdateNotificationControl = (data) => {
  return requestWithToken("/customer/notification/control", {
    method: "PATCH",
    data: data,
  });
};
