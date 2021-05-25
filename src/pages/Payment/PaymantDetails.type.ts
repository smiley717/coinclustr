export type TItem = {
  title: string;
  value: string[];
  itemClass?: string;
};

export type TInfo = {
  amount: string;
  recipient: string;
};

export type TData = {
  paymentDetails: TItem[];
  paymentInfo: TInfo;
}