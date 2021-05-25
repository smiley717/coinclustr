import Widgets from "./mockData/Widgets.json";
import Widget from "./mockData/Widget.json";

const newWidget = Widget;
const widgets = Widgets;

export const WidgetServiceStub = (mock) => {
  mock.onGet(/^\/wallet\/(.*)\/widgets/).reply((config) => {
    return [200, widgets];
  });

  mock.onGet(/^\/wallet\/(.*)\/widget\/(.*)/).reply((config) => {
    return [200, newWidget];
  });

  mock
    .onDelete(/^\/wallet\/(.*)\/widget\/(.*)/)
    .reply(200)
    .onPut(/^\/wallet\/(.*)\/widget\/(.*)/)
    .reply(200)
    .onAny()
    .passThrough();

  mock.onPost(/^\/wallet\/(.*)\/widget/).reply((config) => {
    let params = JSON.parse(config.data);
    let newDummyWidget = newWidget;
    newDummyWidget.id = Math.random().toString(36).substr(2, 36);
    newDummyWidget.walletId = params["walletId"];
    newDummyWidget.walletCategory = params["walletCategory"];
    newDummyWidget.widgetName = params["widgetName"];
    newDummyWidget.amount = params["amount"];
    newDummyWidget.widgetPaymentType = params["widgetPaymentType"];
    newDummyWidget.widgetTitle = params["widgetTitle"];
    newDummyWidget.widgetDescription = params["widgetDescription"];
    newDummyWidget.codeSnippet = params["codeSnippet"];
    widgets.push(newDummyWidget);

    return [204, newDummyWidget];
  });
};
