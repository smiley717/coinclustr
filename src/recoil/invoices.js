import { atom } from "recoil";

export const userFilters = atom({
  key: "invoiceUserFilters",
  default: [],
});

export const selectedFilters = atom({
  key: "invoiceSelectedFilters",
  default: [],
});