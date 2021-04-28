import React from "react";
import { get, map, size } from "lodash";
import Widget from "../Widget/Widget";
import { fetchDelete } from "../../api/fetch";

const OrdersTable = (props) => {
  const { orders, userOrders = false, refreshOrders } = props;

  const cancelOrder = async (id) => {
    try {
      await fetchDelete(`orders/${id}`);
      refreshOrders();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Widget
      title={
        userOrders
          ? `My Orders (${size(orders)})`
          : `All Orders (${size(orders)})`
      }
      style={{ height: "calc(50vh - 200px)" }}
    >
      <table
        className="table table-dark table-striped table-sm"
        data-test="orders-table"
      >
        <thead>
          <tr>
            <th data-test="orders-table-head">{!userOrders && "User ID"}</th>
            <th data-test="orders-table-head">Side</th>
            <th data-test="orders-table-head">Amount</th>
            <th data-test="orders-table-head">Price</th>
          </tr>
        </thead>
        <tbody>
          {map(orders, (item) => (
            <tr key={get(item, ["id"])} data-test="orders-table-row">
              <td>
                {userOrders ? (
                  <i
                    className="bi bi-trash"
                    style={{ cursor: "pointer" }}
                    onClick={() => cancelOrder(get(item, ["id"]))}
                    data-test="orders-table-cancel-button"
                  />
                ) : (
                  get(item, ["userId"])
                )}
              </td>
              <td>{get(item, ["side"])}</td>
              <td>{get(item, ["amount"])}</td>
              <td>{get(item, ["price"])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Widget>
  );
};

export default OrdersTable;
