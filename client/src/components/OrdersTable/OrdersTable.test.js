import React from "react";
import { shallow, render, mount } from "enzyme";
import { size } from "lodash";

import { findByTestAttrNoHook } from "../../utils/tests";

import OrdersTable from "./OrdersTable";

const testOrders = require("../../testData/orders.json");

const setup = ({ orders, userOrders }) => {
  return mount(<OrdersTable orders={orders} userOrders={userOrders} />);
};

const defaultProps = {
  orders: testOrders,
  userOrders: false,
  refreshOrders: () => 1,
};

test("Component renders without error", () => {
  const wrapper = setup(defaultProps);
  const component = findByTestAttrNoHook(wrapper, "orders-table");
  expect(component.length).toBe(1);
});

test("Table has the right columns header when all orders", () => {
  const wrapper = setup(defaultProps);
  const component = findByTestAttrNoHook(wrapper, "orders-table-head");
  expect(component.length).toBe(4);
  expect(component.at(0).text()).toBe("User ID");
  expect(component.at(1).text()).toBe("Side");
  expect(component.at(2).text()).toBe("Amount");
  expect(component.at(3).text()).toBe("Price");
});

test("Table has the right columns header when user orders", () => {
  const wrapper = setup({ orders: testOrders, userOrders: true });
  const component = findByTestAttrNoHook(wrapper, "orders-table-head");
  expect(component.length).toBe(4);
  expect(component.at(0).text()).toBe("");
  expect(component.at(1).text()).toBe("Side");
  expect(component.at(2).text()).toBe("Amount");
  expect(component.at(3).text()).toBe("Price");
});

test("Table has the right rows number", () => {
  const wrapper = setup(defaultProps);
  const component = findByTestAttrNoHook(wrapper, "orders-table-row");
  expect(component.length).toBe(size(testOrders));
});

test("Table first order is correctly rendered when all orders", () => {
  const wrapper = setup(defaultProps);
  const component = findByTestAttrNoHook(wrapper, "orders-table-row");
  const firstRow = component.at(0);
  expect(firstRow.childAt(0).text()).toBe("2");
  expect(firstRow.childAt(1).text()).toBe("ASK");
  expect(firstRow.childAt(2).text()).toBe("15");
  expect(firstRow.childAt(3).text()).toBe("12");
});

test("Table first order is correctly rendered when user orders", () => {
  const wrapper = setup({ orders: testOrders, userOrders: true });
  const component = findByTestAttrNoHook(wrapper, "orders-table-row");
  const firstRow = component.at(0);
  //expect(firstRow.childAt(0).childAt(0).type()).to.equal("i");
  expect(firstRow.childAt(1).text()).toBe("ASK");
  expect(firstRow.childAt(2).text()).toBe("15");
  expect(firstRow.childAt(3).text()).toBe("12");
});

test("Cancel order", () => {
  const wrapper = setup({
    orders: testOrders,
    userOrders: true,
    refreshOrders: defaultProps.refreshOrders,
  });
  const component = findByTestAttrNoHook(wrapper, "orders-table-cancel-button");
  component.at(0).simulate("click");
});
