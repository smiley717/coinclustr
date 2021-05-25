import Notifications from "./mockData/notification/notification_list.json";

const notification_list = Notifications;

export const NotificationServiceStub = (mock) => {
  mock.onGet("/cccustomer/customer/notifications").reply(() => {
    return [200, notification_list];
  });
};
