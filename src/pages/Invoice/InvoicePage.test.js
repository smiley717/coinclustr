import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";
import "jest-styled-components";

import InvoicesPage from "./InvoicePage";
import LayoutFrame from "../../components/Layout";
import { updateWrapper } from "../../tests/testUtils";

Enzyme.configure({ adapter: new Adapter() });

describe("<InvoicePage /> render properly", () => {
  let wrapperShallow;
  let wrapperMount;

  beforeEach(async () => {
    wrapperShallow = shallow(
      <MemoryRouter>
        <InvoicesPage />
      </MemoryRouter>
    );
    wrapperMount = mount(
      <MemoryRouter>
        <InvoicesPage />
      </MemoryRouter>
    );
    await updateWrapper(wrapperMount);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should rendered InvoicesPage component properly", () => {
    expect(wrapperShallow.html()).toMatchSnapshot();
    console.log("wrapperShallow.html()", wrapperShallow.html());
  });

  it("should not rendered PaymentPage when navigate to /", () => {
    const wrapperApp = mount(
      <MemoryRouter initialEntries={["/"]}>
        <LayoutFrame />
      </MemoryRouter>
    );
    expect(wrapperApp.find(InvoicesPage)).toHaveLength(0);
  });

  it("should rendered PaymentPage when navigate to /dashboard/wallets", () => {
    const wrapperApp = mount(
      <MemoryRouter initialEntries={["/dashboard/wallets"]}>
        <LayoutFrame />
      </MemoryRouter>
    );
    expect(wrapperApp.find(InvoicesPage)).toHaveLength(0);
  });
});
