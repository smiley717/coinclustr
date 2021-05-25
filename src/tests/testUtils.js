import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

const TestHook = ({ callback }) => {
  callback();
  return null;
};

export const testHook = (callback) => {
  mount(<TestHook callback={callback} />);
};

export function wait(amount = 0) {
  return new Promise((resolve) => setTimeout(resolve, amount));
}

// Use this in your test after mounting if you need just need to let the query finish without updating the wrapper
export async function actWait(amount = 0) {
  await act(async () => {
    await wait(amount);
  });
}

// Use this in your test after mounting if you want the query to finish and update the wrapper
export async function updateWrapper(wrapper, amount = 0) {
  await act(async () => {
    await wait(amount);
    wrapper.update();
  });
}
