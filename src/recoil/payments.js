import { atom } from "recoil";

export const payments = atom({
  key: "payments",
  default: {},
});

export const paymentId = atom({
  key: "paymentId",
  default: null,
});

export const userFilters = atom({
  key: "paymentUserFilters",
  default: [],
});

export const selectedFilters = atom({
  key: "paymentSelectedFilters",
  default: [],
});

export const preValidatedId = atom({
  key: "preValidatedId",
  default: '',
});