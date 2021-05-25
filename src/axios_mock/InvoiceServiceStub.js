import Invoices from "./mockData/invoice/Invoices.json";
import Invoice from "./mockData/invoice/Invoice.json";
import InvoiceStats from "./mockData/invoice/InvoiceStats.json";

const invoiceList = Invoices;
const singleInvoice = Invoice;
const invoicStats = InvoiceStats;

export const InvoiceServiceStub = (mock) => {
  // get all invoice
  mock.onGet("/wallet/v2/getAllInvoices").reply((config) => {
    return [200, invoiceList];
  });

  // get single invoice
  mock
    .onGet("/invoicing/invoice/942f8140-9520-4355-88ea-facac788de70")
    .reply((config) => {
      return [200, invoiceList.content[0]];
    });

  // get single invoice
  mock
    .onGet("/invoicing/invoice/942f8140-9520-4355-88ea-facac788de71")
    .reply((config) => {
      return [200, invoiceList.content[1]];
    });

  // get single invoice
  mock
    .onGet("/invoicing/invoice/942f8140-9520-4355-88ea-facac788de72")
    .reply((config) => {
      return [200, invoiceList.content[2]];
    });

  // create a new invoice
  mock.onPost("/invoicing/create").reply((config) => {
    return [200, invoiceList];
  });

  // get stats of invoice
  mock.onGet(/^\/invoicing\/invoices\/stats(.*)/).reply((config) => {
    return [200, invoicStats];
  });

  mock.onGet(/^\/wallet\/getInvoicesStats(.*)/).reply((config) => {
    return [200, invoicStats];
  });
};
